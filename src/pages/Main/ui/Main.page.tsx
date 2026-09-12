import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { usePageTransition } from "@/shared/ui/page-transition";
import { HowItWorksPanel } from "@/widgets/how-it-works";
import { LandingHero } from "@/widgets/landing-hero";

export default function Main() {
  const howItWorksButtonRef = useRef<HTMLButtonElement>(null);
  const [howItWorksOpened, { open: openHowItWorks, close: closeHowItWorks }] =
    useDisclosure(false);
  const { navigateWithTransition } = usePageTransition();

  return (
    <>
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
