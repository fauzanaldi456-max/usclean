import Link from "next/link"
import { BookOpen, ShoppingBag, Heart, Gift, Wallet, MessageCircle, Users, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  href: string
}

const FeatureCard = ({ title, description, icon, href }: FeatureCardProps) => {
  // Mapping ikon Lucide ke komponen
  const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    ShoppingBag,
    Heart,
    Gift,
    Wallet,
    MessageCircle,
    Users,
  }

  const IconComponent = iconMap[icon] || BookOpen

  const showIcon = icon !== "Gift"
  return (
    <Card className="card-hover-effect glass rounded-2xl shadow-lg border-0 overflow-hidden h-full">
      <CardHeader className="pb-2">
        {showIcon && (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0f4c81]/10 to-[#0f4c81]/20 flex items-center justify-center mb-4 shadow-md">
            <IconComponent className="h-7 w-7 text-[#0f4c81]" />
          </div>
        )}
        <h3 className="text-xl font-bold font-nunito text-slate-800">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="text-[#0f4c81] hover:text-[#0f4c81]/80 p-0">
         
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FeatureCard
