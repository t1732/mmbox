import {
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";

import type { ReactNode } from "react";
import "./MailSummary.css";

const node = (
  <List sx={{ width: "100%" }} component="div">
    <ListItemButton>
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
        secondary={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
      />
    </ListItemButton>
  </List>
);

export const MailBoxRowSkeleton = ({ count }: { count: number }) => {
  const nodes = new Array<ReactNode>(count).fill(node);

  return (
    <div>
      {nodes.map((node, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <i> is fine here since the list is static
        <div key={`item-${index}`}>
          {node}
          {index + 1 < nodes.length && (
            <Divider variant="inset" component="div" />
          )}
        </div>
      ))}
    </div>
  );
};
