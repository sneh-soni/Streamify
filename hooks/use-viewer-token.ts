import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
          metadata?: string;
          // sub?: string;
        };

        const name = decodedToken?.name;
        if (name) {
          setName(name);
        }

        // const Identity = decodedToken?.sub; // Incase jti passed as subject

        if (decodedToken?.metadata) {
          const metadata = JSON.parse(decodedToken.metadata);
          const Identity = metadata.jti;
          setIdentity(Identity);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
