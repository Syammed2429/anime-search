import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Button,
  type ButtonProps,
  buttonVariants,
} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  isMobile = false,
  pageSize = 20,
  onPageSizeChange = () => {},
}: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = isMobile ? 3 : 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, page - (isMobile ? 0 : 1));
      let end = Math.min(totalPages - 1, page + (isMobile ? 0 : 1));

      // Adjust if at the beginning
      if (page <= 3) {
        end = Math.min(totalPages - 1, isMobile ? 2 : 4);
      }

      // Adjust if at the end
      if (page >= totalPages - 2) {
        start = Math.max(2, totalPages - (isMobile ? 1 : 3));
      }

      // Add ellipsis if needed at the beginning
      if (start > 2) {
        pageNumbers.push("...");
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed at the end
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex items-center space-x-1 sm:space-x-2'>
      {!isMobile && (
        <div className='flex items-center mr-2'>
          <span className='text-xs sm:text-sm mr-2'>Show:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className='w-[70px] h-8 sm:h-9 text-xs sm:text-sm'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      <div className='flex items-center space-x-1'>
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className='px-1 sm:px-2 text-xs sm:text-sm'
            >
              ...
            </span>
          ) : (
            <Button
              key={`page-${pageNumber}`}
              variant={page === pageNumber ? "default" : "outline"}
              size='icon'
              onClick={() =>
                typeof pageNumber === "number" && onPageChange(pageNumber)
              }
              className={cn("h-7 w-7 sm:h-8 sm:w-8", isMobile && "text-xs")}
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>

      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label='Next page'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>

      {!isMobile && (
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          aria-label='Last page'
          className='hidden sm:flex'
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
};

const _Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
_Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className='h-4 w-4' />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
