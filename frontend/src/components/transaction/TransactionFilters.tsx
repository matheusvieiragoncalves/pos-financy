import { SearchIcon } from "lucide-react"
import { Card } from "../ui/card"
import { Field, FieldLabel, FieldSet } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function TransactionFilters() {
  const categoryOptions: { value: string | null; label: string }[] = [
    { value: null, label: "Todas" },
  ]

  const periodOptions: { value: string | null; label: string }[] = [
    { value: null, label: "Novembro / 2025" },
  ]

  const typeOptions: { value: string | null; label: string }[] = [
    { value: null, label: "Todos" },
  ]

  return (
    <Card className="px-6 py-5">
      <FieldSet className="flex flex-row gap-4">
        <Field>
          <FieldLabel
            className="text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Descrição
          </FieldLabel>

          <InputGroup className="flex items-center gap-2 rounded-lg border-gray-400 bg-white py-6 text-base">
            <InputGroupInput
              id="description"
              placeholder="Buscar por descrição"
              className="text-base placeholder:text-base placeholder:text-gray-400"
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="size-4 text-gray-400" />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel
            className="text-sm font-medium text-gray-700"
            htmlFor="type"
          >
            Tipo
          </FieldLabel>

          <Select items={typeOptions}>
            <SelectTrigger className="rounded-lg border-gray-300 bg-white py-6 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {typeOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel
            className="text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Categoria
          </FieldLabel>

          <Select items={categoryOptions}>
            <SelectTrigger className="rounded-lg border-gray-300 bg-white py-6 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categoryOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel
            className="text-sm font-medium text-gray-700"
            htmlFor="period"
          >
            Período
          </FieldLabel>

          <Select items={periodOptions}>
            <SelectTrigger className="rounded-lg border-gray-300 bg-white py-6 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {periodOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldSet>
    </Card>
  )
}
