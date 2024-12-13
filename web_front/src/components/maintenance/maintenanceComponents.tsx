import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";

// Common Selectable List Component
const SelectableList = ({ label, value, options = [], onChange }: any) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded="false"
            className="w-[150px] justify-between"
          >
            {value?.label || `Select ${label}`} <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandGroup>
              {(options || []).map((option:any) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => onChange(option)}
                >
                  <CheckIcon
                    className={
                      cn(
                        "mr-2 h-4 w-4",
                        value?.value === option.value ? "opacity-100" : "opacity-0"
                      )
                    }
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };
  
  // Data for Priority, Status, Type, and Teams
  const PRIORITY_OPTIONS = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
  ];
  
  const STATUS_OPTIONS = [
    { label: "Backlog", value: "backlog" },
    { label: "Todo", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
    { label: "Canceled", value: "canceled" },
  ];
  
  const TYPE_OPTIONS = [
    { label: "Feature", value: "feature" },
    { label: "Bug", value: "bug" },
    { label: "Documentation", value: "documentation" },
    { label: "Other", value: "other" },
  ];
  
  const TEAM_OPTIONS = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Mobile", value: "mobile" },
    { label: "QA", value: "qa" },
  ];
  
  // Individual Select Components
  export const Priority = ({ value, onChange }:any) => (
    <SelectableList label="Priority" value={value} options={PRIORITY_OPTIONS} onChange={onChange} />
  );
  
  export const Status = ({ value, onChange }: any) => (
    <SelectableList label="Status" value={value} options={STATUS_OPTIONS} onChange={onChange} />
  );
  
  export const Type = ({ value, onChange }: any) => (
    <SelectableList label="Type" value={value} options={TYPE_OPTIONS} onChange={onChange} />
  );
  
  export const Teams = ({ value, onChange }: any) => (
    <SelectableList label="Teams" value={value} options={TEAM_OPTIONS} onChange={onChange} />
  );
  