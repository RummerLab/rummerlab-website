import { PublicationsCards } from "@/components/PublicationsCards"
import { PublicationsList } from "@/components/Publications"

export const metadata = {
  title: "Physioshark Project",
  description: '',
}

export default function Publications() {
  return (
      <>
          <PublicationsCards />
          <PublicationsList />
      </>
  )
}