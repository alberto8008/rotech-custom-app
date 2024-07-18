import React, { useState } from "react";
import { handleProductsRename } from "../services/handleProducts";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const Body = ({ productCounts }: { productCounts: number }) => {
  const [renamedCounts, setRenamedCounts] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    setLoading(true);
    const renamedCounts: number | undefined = await handleProductsRename();
    setLoading(false);
    setRenamedCounts(renamedCounts ?? 0);
  };

  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <Box width="50%" display="flex" flexDirection="column" gap="3em">
        <Typography variant="h5">
          Number of products on ROTECH store : {productCounts}
        </Typography>

        <LoadingButton
          size="large"
          onClick={handleRename}
          loading={loading}
          variant="contained"
        >
          Update products url
        </LoadingButton>

        <Typography variant="h5">
          Number of products updated : {renamedCounts}
        </Typography>
      </Box>
    </Box>
  );
};
