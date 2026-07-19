"use client";

import { Link2 } from "lucide-react";
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
        <button onClick={handleCopy} className="btn-outline-sm">
            <Link2 size={15} strokeWidth={2} />
            <span className="hidden sm:inline">Link público</span>
            <span className="sm:hidden">Link</span>
        </button>
    );
}