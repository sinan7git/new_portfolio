import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
// Removed server-side imports and AWS SES dependencies
// import { Form, useActionData, useNavigation } from '@remix-run/react';
// import { json } from '@remix-run/cloudflare';
// import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

// The server action function has been removed because we now use a client‑side mailto link.

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userEmail = email.value;
    const userMessage = message.value;

    // Basic client‑side validation
    if (!userEmail || !EMAIL_PATTERN.test(userEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!userMessage) {
      setError('Please enter a message.');
      return;
    }
    if (userEmail.length > MAX_EMAIL_LENGTH) {
      setError(`Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`);
      return;
    }
    if (userMessage.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    // Build the mailto link with the subject and body prefilled
    const subject = encodeURIComponent(`Portfolio message from ${userEmail}`);
    const body = encodeURIComponent(`From: ${userEmail}\n\n${userMessage}`);
    window.location.href = `mailto:sinanaslam2003@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <Section className={styles.contact}>
      {/* Use a plain HTML form with our onSubmit handler */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Heading
          className={styles.title}
          data-status="entered"
          level={3}
          as="h1"
          style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
        >
          <DecoderText text="Say hello" start={true} delay={300} />
        </Heading>
        <Divider
          className={styles.divider}
          data-status="entered"
          style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
        />
        {/* Hidden honeypot field to identify bots */}
        <Input
          className={styles.botkiller}
          label="Name"
          name="name"
          maxLength={MAX_EMAIL_LENGTH}
        />
        <Input
          required
          className={styles.input}
          data-status="entered"
          style={getDelay(tokens.base.durationXS, initDelay)}
          autoComplete="email"
          label="Your email"
          type="email"
          name="email"
          maxLength={MAX_EMAIL_LENGTH}
          {...email}
        />
        <Input
          required
          multiline
          className={styles.input}
          data-status="entered"
          style={getDelay(tokens.base.durationS, initDelay)}
          autoComplete="off"
          label="Message"
          name="message"
          maxLength={MAX_MESSAGE_LENGTH}
          {...message}
        />
        {error && (
          <div className={styles.formError}>
            <div className={styles.formErrorContent} ref={errorRef}>
              <div className={styles.formErrorMessage}>
                <Icon className={styles.formErrorIcon} icon="error" />
                {error}
              </div>
            </div>
          </div>
        )}
        <Button
          className={styles.button}
          data-status="entered"
          style={getDelay(tokens.base.durationM, initDelay)}
          type="submit"
        >
          Send message
        </Button>
      </form>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
