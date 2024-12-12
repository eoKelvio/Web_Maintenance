import { useState } from "react"
import {  } from "@/components/date-picker" // Ajuste para o componente real que você usa.

interface DatePickerDemoProps {
  onDateChange?: (date: string) => void
}

export function DatePickerDemo({ onDateChange }: DatePickerDemoProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (onDateChange && date) {
      onDateChange(date.toISOString()) // Converte a data para string.
    }
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="Selecione uma data"
    />
  )
}
