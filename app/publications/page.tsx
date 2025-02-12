import { PublicationsCards } from "@/components/PublicationsCards"

export const metadata = {
  title: "Physioshark Project",
  description: '',
}

export default async function Publications() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PublicationsCards />
      </div>
  )
}