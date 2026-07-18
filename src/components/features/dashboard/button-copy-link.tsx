"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyLinkButtonProps {
    userId: string;
}

export function CopyLinkButton({ userId }: CopyLinkButtonProps) {
    function handleCopy() {
        const url = `${window.location.origin}/salao/${userId}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copiado para a área de transferência!");
    }

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[var(--surface-low)] border border-[var(--outline)] text-foreground px-3 sm:px-5 xl:px-6 py-2.5 xl:py-3 text-xs sm:text-sm xl:text-base font-medium rounded-lg hover:border-primary/50 transition-colors cursor-pointer whitespace-nowrap"
        >
            <Copy size={14} className="text-muted-foreground" />
            <span className="hidden sm:inline">Link Público</span>
            <span className="sm:hidden">Link</span>
        </button>
    );
}