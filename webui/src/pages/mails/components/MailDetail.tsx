/* eslint-disable react/jsx-props-no-spreading */
import { useState, ReactNode, SyntheticEvent } from 'react';
import {
  Box,
  Paper,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Mail } from '../../../api/hooks/useMailsQuery';
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
}: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          textColor="secondary"
        >
          <Tab label="Html" {...a11yProps(0)} />
          <Tab label="Text" {...a11yProps(1)} />
          <Tab label="HEADER" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <iframe
          className="html-frame"
          title="html"
          srcDoc={html}
          width="100%"
          height={window.outerHeight * 0.6}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div className="text-body">{text}</div>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>MessageId</TableCell>
                <TableCell>{messageId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>{subject}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>{createdAt}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ContentType</TableCell>
                <TableCell>{contentType}</TableCell>
              </TableRow>
              {fromAddresses && (
                <TableRow>
                  <TableCell>from</TableCell>
                  <TableCell>
                    {fromAddresses?.map(({ address, name }) => (
                      <div key={`from-${address}`}>
                        {address}
                        {name && `<${name}>`}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
              {toAddresses && (
                <TableRow>
                  <TableCell>to</TableCell>
                  <TableCell>
                    {toAddresses?.map(({ address, name }) => (
                      <div key={`to-${address}`}>
                        {address}
                        {name && `<${name}>`}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
              {ccAddresses && (
                <TableRow>
                  <TableCell>cc</TableCell>
                  <TableCell>
                    {ccAddresses?.map(({ address, name }) => (
                      <div key={`cc-${address}`}>
                        {address}
                        {name && `<${name}>`}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
              {bccAddresses && (
                <TableRow>
                  <TableCell>bcc</TableCell>
                  <TableCell>
                    {bccAddresses?.map(({ address, name }) => (
                      <div key={`bcc-${address}`}>
                        {address}
                        {name && `<${name}>`}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};