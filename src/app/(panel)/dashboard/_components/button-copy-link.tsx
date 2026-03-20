"use client";

import { Link } from "lucide-react";
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
            className="border border-border bg-card text-foreground px-3 py-2 rounded-md hover:border-primary transition-colors cursor-pointer"
        >
            <Link size={16} />
        </button>
    );
}