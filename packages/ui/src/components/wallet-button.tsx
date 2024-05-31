"use client";

import Image from "next/image";
import type { InjectedAccountWithMeta } from "../types";

interface PolkadotHook {
  handleConnect: () => void;
  isInitialized: boolean;
  selectedAccount: InjectedAccountWithMeta | null;
}

interface WalletButtonProps {
  hook: PolkadotHook;
}

export function WalletButton({ hook }: WalletButtonProps): JSX.Element {
  const { handleConnect, isInitialized, selectedAccount } = hook;

  if (!isInitialized) {
    return (
      <div className="ui-flex ui-items-center ui-justify-center ui-px-4">
        Close Icon
      </div>
    );
  }

  function formatString(text: string): string {
    if (text.length > 10) return `${text.slice(0, 10)}...`;
    return text;
  }

  return (
    <button
      className={`ui-relative ui-inline-flex ui-items-center ui-justify-center ui-gap-3 ui-px-4 ui-py-2 ui-border ui-border-gray-500 ui-text-gray-400 ui-active:top-1 hover:ui-border-green-600 hover:ui-text-green-600 hover:ui-bg-green-600/5 ${
        selectedAccount &&
        "ui-text-green-500 ui-border-green-500 ui-bg-green-500/5"
      }`}
      disabled={!isInitialized}
      onClick={handleConnect}
      type="button"
    >
      <span className="ui-flex ui-items-center ui-gap-3 ui-font-medium">
        <Image
          alt="Dao Icon"
          className="w-6"
          height={40}
          src="/wallet-icon.svg"
          width={40}
        />
        {selectedAccount?.meta.name ? (
          <div className="ui-flex ui-flex-col ui-items-start">
            <span className="text-lg font-light">
              {formatString(selectedAccount.meta.name || "")}
            </span>
          </div>
        ) : (
          <span className="ui-text-lg ui-text-white">Connect Wallet</span>
        )}
      </span>
    </button>
  );
}