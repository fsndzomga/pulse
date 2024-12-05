import { NextRequest, NextResponse } from 'next/server';
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.NEBIUS_API_KEY,
  baseURL: process.env.NEBIUS_BASE_URL,
});

interface SchemaField {
  name: string;
  type: string;
}

function buildJsonSchema(schema: SchemaField[]) {
  const properties: { [key: string]: any } = {};
  const required: string[] = [];

  schema.forEach(({ name, type }) => {
    let fieldType;
    switch (type) {
      case 'String':
        fieldType = { type: 'string' };
        break;
      case 'Integer':
        fieldType = { type: 'integer' };
        break;
      case 'Float':
        fieldType = { type: 'number' };
        break;
      case 'Boolean':
        fieldType = { type: 'boolean' };
        break;
      case 'Date':
        fieldType = { type: 'string', format: 'date-time' };
        break;
      default:
        fieldType = { type: 'string' }; // Default to string for unknown types
        break;
    }
    properties[name] = fieldType;
    required.push(name); // Assuming all fields are required
  });

  return {
    title: "GeneratedDataSchema",
    type: "object",
    properties,
    required,
  };
}

// Function to parse data inside all <data> tags
function parseDataTags(content: string): any[] {
  const dataTagRegex = /<data>(.*?)<\/data>/gs; // Regex to capture content within all <data> tags globally
  const matches = Array.from(content.matchAll(dataTagRegex));
  const results: any[] = [];

  matches.forEach((match) => {
    if (match[1]) {
      try {
        const parsed = JSON.parse(match[1].trim());
        results.push(parsed);
      } catch (error) {
        console.error('Error parsing JSON inside <data> tag:', error);
        throw new Error('Invalid JSON inside <data> tag');
      }
    }
  });

  if (results.length === 0) {
    throw new Error('No <data> tags found in the response');
  }

  return results;
}


export async function POST(req: NextRequest) {
  try {

    // Parse the request body
    const body = await req.json();

    const { schema, count } = body;

    // Validate schema and count
    if (!Array.isArray(schema)) {
      return NextResponse.json(
        { error: 'Schema must be an array of fields' },
        { status: 400 }
      );
    }

    if (isNaN(count) || count <= 0) {
      return NextResponse.json(
        { error: 'Count must be a positive number' },
        { status: 400 }
      );
    }

    // If count is greater than 50, return an error
    if (count > 50) {
      return NextResponse.json(
        { error: 'Count must be less than or equal to 50' },
        { status: 400 }
      );
    }

    // Generate JSON schema
    const jsonSchema = buildJsonSchema(schema);
    // Use generateText for synthetic data generation
    const model = openai("meta-llama/Meta-Llama-3.1-405B-Instruct");

    const { text } = await generateText({
      model,
      prompt: `Generate ${count} records of synthetic data matching the following JSON schema:\n${JSON.stringify(jsonSchema, null, 2)}. Put the generated data in a <data> tag for each record. For example:\n<data>{\n  "name": "John Doe",\n  "age": 30\n}</data>`,
    });

    // Parse the generated response
    const generatedData = parseDataTags(text);

    // Return the parsed data
    return NextResponse.json({ data: generatedData }, { status: 200 });
  } catch (error) {
    console.error('Error during data generation:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
