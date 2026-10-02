import { Notice } from "@roprgm/ui/notice";

export default function NoticeAlert() {
  return (
    <Notice tone="alert">
      Your edits couldn't be saved. Check your connection.
    </Notice>
  );
}
