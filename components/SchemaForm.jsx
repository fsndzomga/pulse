"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fieldTypes = ["String", "Integer", "Float", "Boolean", "Date"]

const SchemaForm = ({ onSubmit }) => {
  const [fields, setFields] = useState([{ name: '', type: 'String' }])

  const addField = () => {
    setFields([...fields, { name: '', type: 'String' }])
  }

  const updateField = (index, key, value) => {
    const updatedFields = [...fields]
    updatedFields[index][key] = value
    setFields(updatedFields)
  }

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(fields)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-left">Define Your Schema</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mb-4 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => updateField(index, 'name', e.target.value)}
                className="flex-grow"
              />
              <Select
                value={field.type}
                onValueChange={(value) => updateField(index, 'type', value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={() => removeField(index)}
                variant="destructive"
                size="icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              onClick={addField}
              variant="outline"
            >
              Add Field
            </Button>
            <Button type="submit">
              Generate
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SchemaForm
