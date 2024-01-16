import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Select as AntSelect } from 'antd';
import { useEffect, useRef, useState } from 'react';

const root = createRoot(document.getElementById('app'));
root.render(
  <StrictMode>
    <Select />
  </StrictMode>
);

const loadMore = () => Array.from(Array(15), Math.random);

function Select() {
  const [options, setOptions] = useState(loadMore());
  return (
    <>
      <AntSelect defaultValue={Math.random}>
        {options.map((value) => (
          <AntSelect.Option key={value} value={value}>
            {value}
          </AntSelect.Option>
        ))}

        <AntSelect.Option key="last" disabled>
          <LoadMore loadMore={() => setOptions((x) => [...x, ...loadMore()])} />
        </AntSelect.Option>
      </AntSelect>
    </>
  );
}

function LoadMore({ loadMore }: { loadMore: () => any }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!nodeRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('loading');
          loadMore();
        }
      },
      {
        root: null,
        threshold: [0, 1.0],
      }
    );

    observer.observe(nodeRef.current);

    return () => nodeRef.current && observer.unobserve(nodeRef.current);
  }, [nodeRef]);
  return <span ref={nodeRef}>loading...</span>;
}
