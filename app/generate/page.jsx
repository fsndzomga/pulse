"use client";

import React, { useState } from "react";
import SchemaForm from "@/components/SchemaForm";
import GenerateModal from "@/components/GenerateModal";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"


export default function Home() {
  const [schema, setSchema] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSchemaSubmit = (fields) => {
    setSchema(fields);
    setIsModalOpen(true);
  };

  const handleGenerate = async (count) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schema, count }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const { data } = await response.json();
      setData(data);
      setIsModalOpen(false);
      toast({
        title: "Data Generated",
        description: `Successfully generated ${count} records.`,
      });
    } catch (error) {
      console.error("Error generating data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (data.length > 0) {
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "synthetic_data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: "Download Successful",
          description: "Your CSV file has been downloaded.",
        });
      }
    } else {
      toast({
        title: "Download Failed",
        description: "No data available to download.",
        variant: "destructive",
      });
    }
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((obj) => Object.values(obj).join(","));
    return [header, ...rows].join("\n");
  };

  const columns = React.useMemo(
    () =>
      schema.map((field) => ({
        accessorKey: field.name,
        header: field.name,
      })),
    [schema]
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-left text-foreground mb-12">
          Generate Synthetic Data
        </h1>
        <SchemaForm onSubmit={handleSchemaSubmit} />
        <GenerateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
        {data.length > 0 && (
          <div className="mt-12">
            <Button onClick={handleDownload} className="mb-6">
              Download as CSV
            </Button>
            <DataTable columns={columns} data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
