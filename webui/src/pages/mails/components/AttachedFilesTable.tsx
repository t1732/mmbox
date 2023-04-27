import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconButton } from '../../../components/parts';
import { DownloadIcon } from '../../../components/parts/icon';
import { Mail } from '../../../api/hooks/useMailsQuery';

type Props = Pick<Mail, 'attachedFiles'>;

export const AttachedFilesTable = ({ attachedFiles }: Props) => (
  <Stack direction="row" justifyContent="center" alignItems="flex-start">
    <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(attachedFiles ?? []).map(({ name, size, url }) => (
            <TableRow key={`${name}-${size}`}>
              <TableCell>{name}</TableCell>
              <TableCell>{size}</TableCell>
              <TableCell>
                <a href={url} download>
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
);
