/* eslint-disable react-hooks/exhaustive-deps */
import { ClientInput } from "@/data";
import {
  Button,
  FileInput,
  FormGroup,
  InputGroup,
  Intent,
  OverlayToaster,
  ToasterInstance,
} from "@blueprintjs/core";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

export let toaster: OverlayToaster;

type Props = {
  onSubmit: (data: ClientInput) => void;
  onClose: () => void;
};

export const CreateForm = (props: Props) => {
  const { onSubmit, onClose } = props;

  // createRoot(document.getElementById('toaster')!).render(
  //   <OverlayToaster
  //     ref={instance => {
  //       toaster = instance!;
  //     }}
  //   />,
  // );

  type FieldData<T> = {
    value?: T;
    error?: string;
    touched?: boolean;
  };

  // this is a nightmare, but i ran out of time to find out what's wrong with
  // integrating blueprintjs and react-hook-form
  const [avatar, setAvatar] = useState<{
    filename?: string;
    base64Data?: string;
  }>({});
  const [name, setName] = useState<FieldData<string>>({});
  const [organization, setOrganization] = useState<FieldData<string>>({});
  const [contact, setContact] = useState<FieldData<string>>({});
  const [assignedUser, setAssignedUser] = useState<FieldData<string>>({});

  useEffect(() => {
    if (!name.value && name.touched) {
      setName((data) => ({ ...data, error: "required" }));
    } else {
      setName((data) => ({ ...data, error: undefined }));
    }
  }, [name.value]);

  useEffect(() => {
    if (!contact.value && contact.touched) {
      setContact((data) => ({ ...data, error: "required" }));
    } else {
      if (!isValidPhoneNumber(contact.value || "") && contact.touched) {
        setContact((data) => ({ ...data, error: "phoneNo" }));
      } else {
        setContact((data) => ({ ...data, error: undefined }));
      }
    }
  }, [contact.value]);

  useEffect(() => {
    if (!assignedUser.value && assignedUser.touched) {
      setAssignedUser((data) => ({ ...data, error: "required" }));
    } else {
      setAssignedUser((data) => ({ ...data, error: undefined }));
    }
  }, [assignedUser.value]);

  const fieldProps = (
    data: FieldData<any>,
    setData: Dispatch<SetStateAction<FieldData<any>>>
  ) => {
    return {
      value: data.value,
      onChange: (e: any) =>
        setData((data) => ({ ...data, value: e.target.value, touched: true })),
      intent: (data.error ? "danger" : undefined) as Intent | undefined,
      "aria-invalid": !!data.error,
    };
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Check no errors
        if (name.error || contact.error || assignedUser.error) {
          // TODO: Show error message
          // toaster.show({
          //   intent: "danger",
          //   message:
          //     "Failed to create client. Please check for missing or invalid values.",
          // });
          console.log('error')
        } else {
          onSubmit({
            avatar: avatar.base64Data as string,
            name: name.value as string,
            organization: organization.value as string,
            contact: contact.value as string,
            assignedUser: assignedUser.value as string,
          });
        }
      }}
    >
      <FormGroup label="Avatar" labelFor="avatar-input">
        <FileInput
          fill
          hasSelection={!!avatar.filename}
          text={avatar.filename}
          inputProps={{
            onChange: async (e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                const file = e.target.files[0];

                // Convert to base64
                const reader = new FileReader();
                reader.onloadend = () => {
                  setAvatar((avatar) => ({
                    ...avatar,
                    base64Data: reader.result?.toString() || "",
                  }));
                };
                reader.readAsDataURL(file);

                setAvatar((avatar) => ({ ...avatar, filename: file.name }));
              }
            },
            accept: "image/*",
          }}
        />
      </FormGroup>
      <FormGroup
        label="Full name"
        labelFor="full-name-input"
        labelInfo="(required)"
        helperText={name.error ? "Please enter client name." : undefined}
        intent={name.error ? "danger" : undefined}
      >
        <InputGroup
          id="full-name-input"
          placeholder="e.g. John Doe"
          name="name"
          {...fieldProps(name, setName)}
        />
      </FormGroup>
      <FormGroup label="Organization" labelFor="organization-input">
        <InputGroup
          id="organization-input"
          name="organization"
          {...fieldProps(organization, setOrganization)}
        />
      </FormGroup>
      <FormGroup
        label="Contact"
        labelFor="contact-input"
        labelInfo="(required)"
        helperText={
          contact.error
            ? contact.error === "required"
              ? "Please enter client contact number."
              : "Client contact must be a valid phone number."
            : undefined
        }
        intent={contact.error ? "danger" : undefined}
      >
        <InputGroup
          id="contact-input"
          placeholder="e.g. +60123456789"
          name="contact"
          {...fieldProps(contact, setContact)}
        />
      </FormGroup>
      <FormGroup
        label="Assigned to"
        labelFor="assigned-input"
        labelInfo="(required)"
        helperText={
          assignedUser.error ? "Please enter assigned user." : undefined
        }
        intent={assignedUser.error ? "danger" : undefined}
      >
        <InputGroup
          id="assigned-input"
          placeholder="e.g. John Doe"
          name="assignedUser"
          {...fieldProps(assignedUser, setAssignedUser)}
        />
      </FormGroup>
      <div>
        <Button type="submit" intent="primary">
          Submit
        </Button>
        <Button onClick={() => onClose()}>Close</Button>
      </div>
    </form>
  );
};
