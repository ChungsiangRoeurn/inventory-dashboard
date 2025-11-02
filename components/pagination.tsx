import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPage,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPage <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });

    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPage - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPage - 1) {
      rangeWithDots.push("...", totalPage);
    } else {
      rangeWithDots.push(totalPage);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center gap-1">
      <Link
        href={getPageUrl(currentPage - 1)}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
          currentPage <= 1
            ? "cursor-not-allowed text-gray-400 bg-gray-100"
            : "hover:bg-gray-100 text-gray-700 bg-white borderc border-gray-300"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft /> Previous
      </Link>

      {visiblePages.map((page, key) => {
        if (page === ". . .") {
          return (
            <span
              key={`dots-${key}`}
              className="px-3 py-2 text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrently = pageNumber === currentPage;

        return (
          <Link
            key={`page-${pageNumber}`}
            href={getPageUrl(pageNumber)}
            className={`px-3 py-2 text-sm font-semibold rounded-lg ${
              isCurrently
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      <Link
        href={getPageUrl(currentPage + 1)}
        className={`flex items-center px-3 py-2 text-sm font-meium rounded-lg ${
          currentPage >= totalPage
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
        }`}
        aria-disabled={currentPage >= totalPage}
      >
        Next
        <ChevronRight />
      </Link>
    </nav>
  );
}
