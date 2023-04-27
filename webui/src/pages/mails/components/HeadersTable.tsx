import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Mail } from '../../../api/hooks/useMailsQuery';

type Props = Pick<
  Mail,
  | 'messageId'
  | 'subject'
  | 'createdAt'
  | 'contentType'
  | 'fromAddresses'
  | 'toAddresses'
  | 'ccAddresses'
  | 'bccAddresses'
  | 'extraHeaders'
>;

export const HeadersTable = ({
  messageId,
  subject,
  createdAt,
  contentType,
  fromAddresses,
  toAddresses,
  ccAddresses,
  bccAddresses,
  extraHeaders,
}: Props) => (
  <TableContainer component={Paper} sx={{ minWidth: 650 }}>
    <Table aria-label="simple table">
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
        {Object.keys(extraHeaders).map((key) => (
          <TableRow key={`${messageId}-${key}`}>
            <TableCell>{key}</TableCell>
            <TableCell>{extraHeaders[key]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
