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
            className="flex items-center gap-2 bg-[#1a1a1a] border border-[#3a3a3a] text-foreground px-5 py-2.5 text-sm font-medium rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
        >
            Link Público
            <Copy size={14} className="text-muted-foreground" />
        </button>
    );
}