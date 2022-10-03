import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TypographyExtension from '@tiptap/extension-typography';
import UnderlineExtension from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Focus from '@tiptap/extension-focus';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';

import ProjectCreateContentToolbar from './Toolbar';
import './styles.css';

import { Flex } from '@adobe/react-spectrum';

interface TipTapProps {
  EditorJSONCallback: any;
}

export default function EditorComponent({
  // setContent,
  content,
  EditorJSONCallback,
}: TipTapProps & {
  // setContent: (value: string) => void;
  content: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      Highlight,
      TypographyExtension,
      UnderlineExtension,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
    ],
    content: content,
  });

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      EditorJSONCallback(editor?.getHTML());
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [editor?.getHTML()]);

  if (!editor) return null;

  return (
    <Flex direction='column'>
      <ProjectCreateContentToolbar editor={editor} />
      <EditorContent editor={editor} />
    </Flex>
  );
}
