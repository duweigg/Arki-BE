'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const [userId, setUserId] = useState<string>("")
  const router = useRouter()
  useEffect(() => {
    const userId = sessionStorage.getItem("userId") ?? ""
    if (userId != "") {
      router.push("/dashboard")
    } else {
      router.push("/login")

    }
  }, [])
}
