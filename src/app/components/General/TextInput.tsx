import { InputTypes } from "@/types/service";
import { Input, extendVariants } from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import React from "react";
import { Controller } from "react-hook-form";

const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      stone: {
        // <- add a new color variant
        inputWrapper: [
          // <- Input wrapper slot
          // "bg-zinc-100",
          "border-2",
          // "shadow",
          "transition-colors",
          "focus-within:bg-primary:100",
          "data-[hover=true]:border-primary:500",
          "data-[hover=true]:bg-zinc-100",
          "group-data-[focus=true]:border-primary-700",
          // dark theme
          // "dark:bg-zinc-900",
          // "dark:border-zinc-800",
          // "dark:data-[hover=true]:bg-zinc-900",
          // "dark:focus-within:bg-zinc-900",
        ],
        input: [
          // <- Input element slot
          "placeholder:text-primary-200",
          // dark theme
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-unit-6 min-h-unit-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-unit-10 min-h-unit-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-unit-14 min-h-unit-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "block",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
    removeLabel: true,
  },
});

const TextInput: React.FC<InputTypes> = (props: InputTypes) => {
  const { type, placeholder, control, name, required, id, ...others } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ?? false }}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <div className={`${error?.message && "pb-2"}`}>
              <MyInput
                type={isVisible ? "text" : type}
                {...field}
                {...others}
                autoComplete="off"
                isInvalid={error ? true : false}
                errorMessage={error?.message}
                variant="bordered"
                endContent={
                  type == "password" && (
                    <div className="top-[1px] relative">
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlash
                            size="27"
                            color="#71717A"
                            variant="Bold"
                            className="text-2xl text-default-400 pointer-events-none"
                          />
                        ) : (
                          <Eye
                            size="27"
                            color="#71717A"
                            variant="Bold"
                            className="text-2xl text-default-400 pointer-events-none"
                          />
                        )}
                      </button>
                    </div>
                  )
                }
              />
              {/* {error?.message != "" && <div className="h-[1px]"></div>} */}
            </div>
          );
        }}
      />
    </>
  );
};

export default TextInput;
