import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { usePageTransition } from "@/shared/ui/page-transition";
import { HowItWorksPanel } from "@/widgets/how-it-works";
import LandingHero from "./components/LandingHero";
import LandingBrand from "./components/LandingBrand";

export default function Main() {
  const howItWorksButtonRef = useRef<HTMLButtonElement>(null);
  const [howItWorksOpened, { open: openHowItWorks, close: closeHowItWorks }] =
    useDisclosure(false);
  const { navigateWithTransition } = usePageTransition();

  return (
    <>
      <LandingBrand onNavigate={navigateWithTransition} />
      <LandingHero
        howItWorksButtonRef={howItWorksButtonRef}
        onNavigate={navigateWithTransition}
        onOpenHowItWorks={openHowItWorks}
      />
      <HowItWorksPanel
        opened={howItWorksOpened}
        returnFocusRef={howItWorksButtonRef}
        onClose={closeHowItWorks}
      />
    </>
  );
}
