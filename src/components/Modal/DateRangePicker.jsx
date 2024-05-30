import {Modal, ModalContent, ModalHeader, RangeCalendar, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import {today, getLocalTimeZone} from '@internationalized/date';


export default function DateRangePicker() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button variant="flat" isIconOnly onPress={onOpen}><MdOutlineCalendarMonth size={20}/></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <RangeCalendar
                aria-label="Date (Uncontrolled)"
                defaultValue={{
                  start: today(getLocalTimeZone()),
                  end: today(getLocalTimeZone()).add({weeks: 1}),
                }}
              />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
