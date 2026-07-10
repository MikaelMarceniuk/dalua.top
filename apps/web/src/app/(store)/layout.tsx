import { StoreProvider } from "@/components/store/providers/store.provider"
import Footer from "@/components/store/footer"
import { Navbar } from "@/components/store/navbar"
import { withChildren } from "@/types/with-children.type"

const StoreLayout: React.FC<withChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </StoreProvider>
  )
}

export default StoreLayout
