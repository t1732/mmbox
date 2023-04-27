/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { Mail } from '../../../api/hooks/useMailsQuery';
import { AttachedFilesTable } from './AttachedFilesTable';
import { HeadersTable } from './HeadersTable';
import { TabContent } from './TabContent';
import './MailDetail.css';

type Props = Mail;
type TabPanelProps = {
  children: ReactNode;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

export const MailDetail = ({
  messageId,
  subject,
  createdAt,
  fromAddresses,
  toAddresses,
  ccAddresses,
  bccAddresses,
  contentType,
  html,
  text,
  extraHeaders,
  attachedFiles,
}: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    setTabIndex(html === '' ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          textColor="secondary"
        >
          <Tab label="Html" {...a11yProps(0)} disabled={html === ''} />
          <Tab label="Text" {...a11yProps(1)} disabled={text === ''} />
          <Tab label="HEADER" {...a11yProps(2)} />
          <Tab
            label="Attached"
            {...a11yProps(3)}
            disabled={(attachedFiles ?? []).length === 0}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <TabContent>
          <iframe
            className="html-frame"
            title="html"
            srcDoc={html}
            width="100%"
            height={window.outerHeight * 0.65}
          />
        </TabContent>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <TabContent>
          <Paper
            className="text-body"
            elevation={2}
            sx={{ padding: '30px', maxHeight: window.outerHeight * 0.65 }}
          >
            {text}
          </Paper>
        </TabContent>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <TabContent>
          <HeadersTable
            messageId={messageId}
            subject={subject}
            createdAt={createdAt}
            contentType={contentType}
            fromAddresses={fromAddresses}
            toAddresses={toAddresses}
            ccAddresses={ccAddresses}
            bccAddresses={bccAddresses}
            extraHeaders={extraHeaders}
          />
        </TabContent>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <TabContent>
          <AttachedFilesTable attachedFiles={attachedFiles} />
        </TabContent>
      </TabPanel>
    </Box>
  );
};
