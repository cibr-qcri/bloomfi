/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { NavLink } from 'react-router-dom';

import { Container, Divider, Grid, Link, Typography } from '@mui/material';

import Logo from '../Logo';

const Footer = () => {
  const view = (
    <Container>
      <Grid container justifyContent="space-between" mb={2}>
        <Grid container item direction="column" alignItems="flex-start" xs={12} sm={4} mb={2}>
          <Logo />
          <Typography variant="caption">Qatar Computing Research Institute, HBKU</Typography>
          <Typography variant="caption">Doha, Qatar</Typography>
        </Grid>
        <Grid container item direction="column" alignItems="flex-start" xs={12} sm={2} mb={2}>
          <Link component={NavLink} to="/privacy" underline="none" mb={1}>
            <Typography variant="body2">Privacy Policy</Typography>
          </Link>
          <Link component={NavLink} to="/terms" underline="none">
            <Typography variant="body2">Terms &amp; Conditions</Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid container textAlign="left" direction="column">
        <Divider flexItem />
        <Typography variant="caption" mt={4} mb={2}>
          The content of this website is for general, informational purposes. Nothing contained on
          this website should be construed as an offer to sell or the solicitation of any offer to
          buy any security or other financial instrument or product offered or managed by BloomFi or
          any other issuer or company. Any such offer is contained only in the form of a private
          placement memorandum and other offering documents that are provided to qualified
          investors, as defined under applicable laws. The provision of this information does not
          constitute the rendering of investment, consulting, legal, accounting, tax, or other
          advice or services. Information on this website should not be the basis of or be relied
          upon for making business, investment or other decisions or used as a substitute for
          consultation with professional advisors, nor should it be construed as advice, endorsement
          or recommendation. This website shall not be considered a solicitation or offering for any
          investment product or service to any person in any jurisdiction where such solicitation or
          offer would be unlawful.
        </Typography>
        <Typography variant="caption" gutterBottom>
          Copyright &copy; 2022 - BloomFi - All Rights Reserved
        </Typography>
      </Grid>
    </Container>
  );

  return view;
};

export default Footer;
