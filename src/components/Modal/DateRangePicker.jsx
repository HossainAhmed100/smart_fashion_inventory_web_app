import {DatePicker} from "@nextui-org/react";

export default function DateRangePicker() {
  return (
    <div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <DatePicker label={""} variant={"flat"}/>
      </div>
  </div>
  );
}
