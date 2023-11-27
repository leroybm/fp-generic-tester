import { useFieldArray, useForm } from "react-hook-form";
import { ExtendedFluidPlayerOptions, AdOptions } from "../../models/ConfiguratorOptions";
import { AdvertismentForm } from "./AdvertismentForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { uniqueId } from "lodash";

const DummyComponent = ({
  openIndex = 0,
  defaultValues = {} as ExtendedFluidPlayerOptions,
  onOpen,
  onRemove,
  onUpdate,
}: {
  openIndex?: number;
  defaultValues?: ExtendedFluidPlayerOptions;
  onOpen?: () => void;
  onRemove?: () => void;
  onUpdate?: (...args: Array<unknown>) => void;
}) => {
  const { control } = useForm<ExtendedFluidPlayerOptions>({
    defaultValues: defaultValues,
  });
  const { fields: advertisments } = useFieldArray({
    name: "vastOptions.adList",
    control,
  });

  return (
    <>
      {advertisments.map((ad, i) => (
        <AdvertismentForm
          key={ad._id}
          control={control}
          update={onUpdate ? onUpdate : () => undefined}
          index={i}
          value={ad}
          isOpen={openIndex === i}
          onClickOpen={onOpen ? onOpen : () => undefined}
          onClickRemove={onRemove ? onRemove : () => undefined}
        />
      ))}
    </>
  );
};

describe("AdvertismentForm", () => {
  it("should render empty", () => {
    render(<DummyComponent />);
  });

  it("should render one", async () => {
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: '' }] as AdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    const title = screen.findByText(adList[0].roll);
    expect(title).toBeTruthy();
  });

  it("should render two", async () => {
    const adList = [
        { _id: uniqueId(), roll: 'preRoll', vastTag: '' },
        { _id: uniqueId(), roll: 'midRoll', vastTag: '', timer: 10 },
    ] as AdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    const preRollTitle = screen.findByText(adList[0].roll);
    const midRollTitle = screen.findByText(adList[1].roll);
    expect(preRollTitle).toBeTruthy();    
    expect(midRollTitle).toBeTruthy();    
  });

  it("should fill form for preRoll", () => {
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: '' }] as AdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    fireEvent.input(screen.getByLabelText("Vast Tag"), {
        target: {
          value: "https://adserver.com/test",
        },
      })

    expect(screen.getByLabelText("Vast Tag")).toHaveValue("https://adserver.com/test")
  });

  xit('should fill form for midRoll', () => {});
  xit('should change displayed form', () => {});
  xit('should add a new form', () => {});
  xit('should delete a form', () => {});
  xit('should update with every entry', () => {});
  xit('should show error messages', () => {});
});
