import {Modal, ModalContent, ModalHeader, RangeCalendar, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import {today, getLocalTimeZone} from '@internationalized/date';


export default function DateRangePicker() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button variant="flat" isIconOnly onPress={onOpen}><MdOutlineCalendarMonth size={20}/></Button>
      <Modal
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
      hideCloseButton	={false}
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] w-80 bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="w-72 m-auto">
              <RangeCalendar aria-label="Date (No Selection)" />
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
