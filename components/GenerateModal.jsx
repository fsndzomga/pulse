"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const GenerateModal = ({ isOpen, onClose, onGenerate, isLoading }) => {
  const [count, setCount] = useState(1)

  const handleGenerate = () => {
    if (count > 0) {
      onGenerate(count)
    } else {
      alert("Please enter a valid number of instances.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Synthetic Data</DialogTitle>
          <DialogDescription>
            Enter the number of instances you want to generate.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="count"
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              min="1"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateModal
