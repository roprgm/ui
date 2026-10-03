import { Fieldset } from "@roprgm/ui/fieldset";
import { Radio } from "@roprgm/ui/radio";

export default function FieldsetError() {
  return (
    <Fieldset legend="Who can see it" error="Choose who can see the album.">
      <label className="flex items-center gap-2">
        <Radio name="visibility" value="private" /> Only me
      </label>
      <label className="flex items-center gap-2">
        <Radio name="visibility" value="link" /> Anyone with the link
      </label>
    </Fieldset>
  );
}
