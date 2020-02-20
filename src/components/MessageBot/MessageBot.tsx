import styled, { StyledComponent } from '@emotion/styled';
import { readableColor } from 'polished';
import React, { ReactNode } from 'react';
import TockTheme from 'TockTheme';

const MessageContainer: StyledComponent<{}, {}, TockTheme> = styled.div`
  width: 100%;
  max-width: ${props => (props.theme && props.theme.conversationWidth) || '720px'};
  margin: 0.5em auto;
`;

const Message: StyledComponent<{}, {}, TockTheme> = styled.div`
  display: inline-block;
  background: ${props => (props.theme && props.theme.botColor) || 'black'};
  color: ${props => readableColor((props.theme && props.theme.botColor) || 'black')};
  padding: 0.5em 1.5em;
  white-space: pre-line;
  border-radius: ${props =>
    (props.theme &&
      props.theme.borderRadius &&
      `${props.theme.borderRadius} ${props.theme.borderRadius} ${props.theme.borderRadius} 0`) ||
    '1em'};

  ${props => (props.theme && props.theme.styles && props.theme.styles.messageBot) || ''}
`;

const MessageBot: ({ children }: { children: ReactNode }) => JSX.Element = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MessageContainer>
      <Message>
        <span dangerouslySetInnerHTML={{ __html: children ? children.toString() : '' }}></span>
      </Message>
    </MessageContainer>
  );
};

export default MessageBot;
