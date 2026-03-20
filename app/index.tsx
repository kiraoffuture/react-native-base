import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { Loading } from "@/components/ui/loading";

export default function Index() {
  const { token } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsub;
  }, []);

  if (!hydrated) {
    return (
      <Loading fullScreen />
    );
  }

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)" />;
}
