import { useRouter } from "next/router";

export default function AccountLayout() {
  const router = useRouter();
  const { asPath } = router;
  const isAccount = asPath === "/account";

  return <div>{isAccount && <div>account layout</div>}</div>;
}
