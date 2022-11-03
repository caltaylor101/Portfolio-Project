import { useEffect, useRef, useState } from "react";
import './fade.css';




export default function FadeInSection(props: any) {
    const [isVisible, setVisible] = useState(true);
    const domRef = useRef();
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current!);
      return () => observer.unobserve(domRef.current!);
    }, []);
    return (
      <div
        className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef as any}
      >
        {props.children}
      </div>
    );
  }