import { Editor } from '@tiptap/react';
import TextAlignLeft from '@spectrum-icons/workflow/TextAlignLeft';
import TextAlignCenter from '@spectrum-icons/workflow/TextAlignCenter';
import TextAlignRight from '@spectrum-icons/workflow/TextAlignRight';
import TextAlignJustify from '@spectrum-icons/workflow/TextAlignJustify';
import TagBold from '@spectrum-icons/workflow/TagBold';
import TagItalic from '@spectrum-icons/workflow/TagItalic';
import TextSuperscript from '@spectrum-icons/workflow/TextSuperscript';
import TextSubscript from '@spectrum-icons/workflow/TextSubscript';
import TagUnderline from '@spectrum-icons/workflow/TagUnderline';
import TextStrikethrough from '@spectrum-icons/workflow/TextStrikethrough';
import TextBulleted from '@spectrum-icons/workflow/TextBulleted';
import TextNumbered from '@spectrum-icons/workflow/TextNumbered';
import Undo from '@spectrum-icons/workflow/Undo';
import Redo from '@spectrum-icons/workflow/Redo';

import { Flex, ToggleButton, Tooltip, TooltipTrigger, View } from '@adobe/react-spectrum';

import settings from '../../../util/settings';
import HeadingToolbarButtons from './toolbars/HeadingToolbarButtons';
import './styles.css';

const ProjectCreateContentToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <View
      borderWidth='thin'
      borderColor='dark'
      borderRadius='regular'
      UNSAFE_className='TipTapToolbar'
    >
      <Flex gap='size-25' margin='size-100' wrap>
        <HeadingToolbarButtons editor={editor} />
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleBold().run()}
            isSelected={editor.isActive('bold')}
            aria-label='bold'
          >
            <TagBold size='S' />
          </ToggleButton>
          <Tooltip>Text Bold</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleItalic().run()}
            aria-label='italic'
            isSelected={editor.isActive('italic')}
          >
            <TagItalic size='S' />
          </ToggleButton>
          <Tooltip>Text Italic</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleUnderline().run()}
            isSelected={editor.isActive('underline')}
            aria-label='underline'
          >
            <TagUnderline size='S' />
          </ToggleButton>
          <Tooltip>Text Underlined</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleStrike().run()}
            aria-label='strike'
            isSelected={editor.isActive('strike')}
          >
            <TextStrikethrough size='S' />
          </ToggleButton>
          <Tooltip>Text Strikethrough</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().setTextAlign('left').run()}
            isSelected={editor.isActive({ textAlign: 'left' })}
            aria-label='left aligned'
          >
            <TextAlignLeft size='S' />
          </ToggleButton>
          <Tooltip>Align left</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().setTextAlign('center').run()}
            isSelected={editor.isActive({ textAlign: 'center' })}
            aria-label='Center aligned'
          >
            <TextAlignCenter size='S' />
          </ToggleButton>
          <Tooltip>Align centered</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().setTextAlign('right').run()}
            isSelected={editor.isActive({ textAlign: 'right' })}
            aria-label='Right aligned'
          >
            <TextAlignRight size='S' />
          </ToggleButton>
          <Tooltip>Align right</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().setTextAlign('justify').run()}
            isSelected={editor.isActive({ textAlign: 'justify' })}
            aria-label='Justify aligned'
          >
            <TextAlignJustify size='S' />
          </ToggleButton>
          <Tooltip>Align justified</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleSuperscript().run()}
            isSelected={editor.isActive('superscript')}
            aria-label='superscript'
          >
            <TextSuperscript size='S' />
          </ToggleButton>
          <Tooltip>Superscript</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleSubscript().run()}
            isSelected={editor.isActive('subscript')}
            aria-label='subscript'
          >
            <TextSubscript size='S' />
          </ToggleButton>
          <Tooltip>Subscript</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleBulletList().run()}
            aria-label='bullettList'
            isSelected={editor.isActive('bulletList')}
          >
            <TextBulleted size='S' />
          </ToggleButton>
          <Tooltip>Bullet List</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label='orderedList'
            isSelected={editor.isActive('orderedList')}
          >
            <TextNumbered size='S' />
          </ToggleButton>
          <Tooltip>Ordered List</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().undo().run()}
            aria-label='undo'
            isSelected={false}
            isDisabled={!editor.can().undo()}
          >
            <Undo size='S' />
          </ToggleButton>
          <Tooltip>Undo</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={settings.toolTipDelay}>
          <ToggleButton
            onPress={() => editor.chain().focus().redo().run()}
            aria-label='redo'
            isSelected={false}
            isDisabled={!editor.can().redo()}
            UNSAFE_className='LastToolbarButton'
          >
            <Redo size='S' />
          </ToggleButton>
          <Tooltip>Redo</Tooltip>
        </TooltipTrigger>
      </Flex>
    </View>
  );
};

export default ProjectCreateContentToolbar;
