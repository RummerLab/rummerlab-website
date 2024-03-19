import { PublicationsCards } from "@/components/PublicationsCards"
import { PublicationsList } from "@/components/Publications"

export const metadata = {
  title: "Physioshark Project",
  description: '',
}

export default async function Publications() {
  return (
    <div className="max-w-2xl mx-auto">
          <PublicationsCards />
          <PublicationsList />
      </div>
  )
}