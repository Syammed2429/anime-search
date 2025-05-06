import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className='relative w-full'>
      <Input
        type='search'
        placeholder='Search for anime...'
        value={value}
        onChange={onChange}
        className='w-full rounded-full pl-10 h-10 sm:h-12'
      />
      <div className='absolute left-3 top-1/2 -translate-y-1/2'>
        <Search className='h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground' />
      </div>
    </div>
  );
}
