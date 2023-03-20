import React, { useEffect, useMemo, useState, Dispatch, SetStateAction } from "react";

type props = {
  output: string;
  setOutput: Dispatch<SetStateAction<string>>;
};

function useModal(props: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (props.output !== "") {
      setIsModalOpen(true);
    }
  }, [props.output]);

  const handleModalOnClose = () => {
    setIsModalOpen(false);
    props.setOutput("");
  };

  return { isModalOpen, handleModalOnClose };
}

export default useModal;
