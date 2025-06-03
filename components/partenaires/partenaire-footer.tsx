import Link from "next/link"
import { Logo } from "@/components/logo"

interface PartenaireFooterProps {
  className?: string
}

// Ne pas utiliser de header personnalisé ici
export function PartenaireFooter({ className = "" }: PartenaireFooterProps) {
  return (
    <footer className={`bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="/mentions-legales"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Mentions légales
          </Link>
          <Link
            href="/confidentialite"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Politique de confidentialité
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Contact
          </Link>
        </div>
        <div className="mt-4 md:order-1 md:mt-0 flex flex-col md:flex-row items-center gap-2">
          <Logo />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Mod'Elles. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
