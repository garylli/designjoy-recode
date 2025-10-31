'use client';
import GUI from 'lil-gui';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const GUIContext = createContext<GUI | null>(null);

const GUIProvider = (props: { children: ReactNode }) => {
  const [gui, setGUI] = useState<GUI | null>(null);

  useEffect(() => {
    setGUI(new GUI());

    return () => gui?.destroy();
  }, []);

  if (!gui) {
    return null;
  }

  return (
    <GUIContext.Provider value={gui}>{props.children}</GUIContext.Provider>
  );
};

const useGUI = () => {
  const gui = useContext(GUIContext);
  if (!gui) {
    throw new Error('Gui not loaded');
  }

  return gui;
};

export { useGUI };
export { GUIProvider };
