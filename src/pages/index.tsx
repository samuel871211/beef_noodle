import { Layout, Typography, Table, Button, Modal, Carousel } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableDataType } from "../types";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Header, Content } = Layout;
const { Title } = Typography;

const dataSource: TableDataType[] = [
  {
    key: 0,
    score: 85,
    storeName: "大業牛肉麵－汐止分店",
    visitDate: new Date("2023-05-20"),
    itemName: "三寶",
    itemPrice: 170,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaXKX6gIyEIezT-LKzAs19QQaCKN6Tod7sj2AmFk8FzpLKqhbcw8tPJrJC_j8h9kX1kV0PPJtyueam2s8rdtYI1G10cXeBTSSh2SFpsPbKj_tEBBVRBAIoSJsAOlVSH1awlsIyoHYM0EQnUyujG8eOce5yX8gsG1hrfQ5zNz1j9pecL0J7J7ihdh-_1byrs2woHYd6_mOUh3hJidoK71YYjfPNSOYfnvooVsflqOk2gt_fgsAbHZ2nUKzxB5vJvOOH2xvYjsFzoM57JLJOfOWuVMb1QGRa248US7Ts9eQkc6Mu6-6-HocpFix79hflFx0opOd_U251ZatAQlN-ON1jsdeWlCtJ3ZdFFs-qaUC6UHM5OW5g9yLmW3iHbsQ9h0Sp1SQiBVExiKn-AOVQ3qQmYMWr-Z3mvofcMyRi_l2NHXN97yPYfC42K1cDYKqfanDnl4wgGQipi4sLlBrnjOgms1EaoEML8Kz1qOEFpW-mDU78slfafYpp5sDgXIJ70a8PYa7Fsmkg8qpk5g9Pdwltysy2RNlDPTM97S5237w7vq1x9VRJ54QhKKCVp2D552pu2VB6_H94tMqLbnqnxyJWO-uAA7j5zVPFrlWM-_lHUX1qS5w5oIc3T1Exl55byaBSH1bDrf-bGAfOzCnJQxZmz1z4Th6AodRZmIGL4Nj5vhyBxuqWPcRtnhXmqYzcVP6Tl3iOakRbHV2Fqlj06Z-NcjRWs3R2ppvslvtQ5FVD7QZqUZ45QQoGb9SWCvgnlScIfaLjhcbNRWge0ap1t4kOWrFMVQJZmQhDLb2UfTUxquh7fX0FFEbn81aeu3NsUTrtkzmjX_UuNIthDQQgB-oSYgAytjlCAnajs1BKKgpeIXdD4rfbD5NL0xsBCuBLF1TmmwfKSwwR2Ko27QCwffaqFSE7c=w919-h1226-s-no?authuser=0",
    ],
    beefDescription: "軟嫩適中，不會太柴",
    tendonDescription: "熬的非常軟嫩",
    noodleDescription: "粗扁麵，個人非常喜歡",
    overallDescription: "店內環境普通",
    wantToVisitAgain: true,
  },
  {
    key: 1,
    score: 89,
    storeName: "牛耳精緻麵館",
    visitDate: new Date("2023-05-24"),
    itemName: "三寶",
    itemPrice: 220,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaWk2kwYf-GX9V8Q5XIkv-jN4PRz6SU9bKSZNwUd2q4JaCOVmaRTJ57BQuBXMQr3ImqoUDdaBxVgCvKoDAvN8jXzNCk2D-23CKrFpvVe-A5Zphh8Uw9rdK0IIm01ccNlRDiJVk6lchD3QRw-HNmN9-89DqgREqz4DhrPTqPPoQTjqklb7RYlZNgi6GCfOTR3zIa_eF1e-i3qBTxGoqmDrTdbxkIz-Xq9dg576XnoxnxRAbNT9GvDZr0NOl59HIzLCFJJ_rb255Tqe8Blg67PkHB6c98JI6ttGa7E70Qkw64IhG4qIt8-Tdq_CAsM72D9NLePa2l47RUuWCtLA7HZvUdsP7R_ne0_T2OBofbIn2-8mBUFigku0OZrWACzsJNVI5QueBBHGSmY3Xd6N2XZPuwpu7jXWbaerMcB9CLtoxZ8aP6jChpOcb030rR5Kfo3JmAXblHtritSWevuOM-Nu08XOt-2RizZeVxu7W4jg8IrLon3d8KOZw7CTBLvlzijEWt0ZE9ZN2KgkasLR8PS7ZQi5j1qi7LqcAi6G3-A4_I0iUrc0kedkFzD2KHx8i1y3xUDlLdGFIGwdN0iE4PhX92mlQpishfgyge69eD0ovvDcSsgwr7028GC09EaiuwVvbL0qcTRZxrWyMG2IA_thNHvFWjWFjjaQDef-w9Uj0a8yQ3SPJGTnCcWk3lIDgYdv4CHxXhlWfp8sco9-0zMqSOhDLD67fLiRBMah1JhUIEDSYHbF0r8xIy79q6UFt8a9wYfgL9wYoBf36Lnp7XZc2neRHnWfTc0ChUhM9wV_DWeotqA1R9Fj-7zO02mWkTVB5R4WQooxuy2uF7COmwvKub7DnvvbSVXpcdy2e55zsOFIY_tM1qAvPtWkCzSvhmvgdmhqa8x_fIRo1QNCz76gmhJQqY=w1635-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaW5zPKi3wZyrPcHqcCfyyL3SXkSkQVVc6qQBivR1TPNqQ-h1Hd-GOHCxCMzALBWijvfqRuzAVVB-Lo1cHEpixyMRMz0-1U7Pmi6iVqMcXR8QyndU-9D8LcJOIeoDPZ115D2rkYXpgvlEfpoQwqUeSah6rTBZlzMrgQ6_y3ns94Z-5CxzAvKoSPSIcgk-u13Axsk1lyoByd5Xo52juS4A3eLcKW5UiHjRaUp4xeR6fE0MIbXntEbW-WM5gxxO5zkSNETfvok-rGb8aoZHVQSBU7YKwHZFi2N9nO-0OkYDxMHX4ciinqVDkz7WuO4uw7_LcJYgi0IoHAuEPGiKYYadAsyoPBPDU5zvEEcE3XgP4EncaRUoRM1tEkU3MHLvhd0xSEBnq6HIRZDSfYIIgrZN56pMiJypCBi5FLJfzIYF2C3nwTfCVdpcuOVrpX7OvYZXqvjqBSCV9wCGaVmPWyZPseAMoFbp3HuxRVf6TH7-M8vXqfMzjZFhpQqYdfd90FHkhEx8M8CHQkaxvq_U2sJsEbg5XZ4IZ2ZgFH5oxLPXWuxwNUMMUu6G83mbY21AD-WqEXHXuLi4HRUO63pXx4B9VOwCYP9XUXPy8ArsgR8IIFFVTgg06rgD_JkWm22Q0mESog63FEBlK5nc6ThTxwSFMz_-j_gqlFp6yE4-m2txwrX6LXbRB8MCytzQWw4sjh3wGd9wNCy5RGLNR1tF3E-QTBE-qvveF-Pt-gTKMnF6dg0KNMWM-UG7HrTIJ4E2A3xAHxy5M861VmzP3SVOp5hWK2BF-md1oA1TbxsRp3GWIvzgFdHVw6NWmcPmcH8hmQukD7lLosrkSYXNM2nZE2xI2WhQ4dpKyzf-QClMEQnIjKB6Imkn7SuQQKCqp5k2Lp-aSRGYAE689Pt5zvo7Bb0GWCwczs=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 4.5,
    noodleDescription: "Q彈的拉麵",
    beefDescription: "完全不會柴，微帶點筋，非常好咬",
    tendonDescription: "入口即化，有個甜甜的尾韻",
    wantToVisitAgain: true,
  },
  {
    key: 2,
    score: 65,
    storeName: "政武牛肉麵",
    visitDate: new Date("2023-05-27"),
    itemName: "牛肉麵",
    itemPrice: 200,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaUABdH_s9Bg5H3uIl2NUEIV91LrhhAybJcrgzeHAyES1jZ7AWLaRdFzLn5mLElRrRpD8c7YZZXtWRldQa8JTxbbfZUTlm3T9LqtqOLKB8m1JYA2e-iKHiFejTOdp7hPBHQq8iO_TsQyaZmsF2CNoS3tWIicjqu98Ru94I5nC1kBZSMEK1-Nygn7et3f7_o2kbT3n8L2pdUiFOybGaQquOMfUTIajaQ-LCMu1SmmO7Z7ut5Qe0v1UNOaGbaldeO8KO6KS56vSV3TtorMIMmmJgF-Ub-FX3bsgn0nyqI9vA96_Qre8BXM97Qo3OuK7ouBKj83MOnFnKMsxqUxRZsaoVPW8Eywm-bH-R-4Eoxc2yRbEOeuTTBnbwIzAIgchRE6M_DKGACStgAZUh-2zYZDDZOpp9lhY64upjAPQ_Jb3jcyDnfRcv2ogBdb3L5F6fw7hHLe8Qm_Dm03CN1MrQEhaV8uHSZYwIashF-DVyCfuI8D796o-mbj2xq-R9rxdycjPMu4Z5o8QvTTcpxyGOs0p3tQ7brcyTJ8lcc68ayP_1-OFiMdQMK20MZWGSAhWP6Fd8LcwPneHX1UIj4rHnDnVnRrIrAVDNuIi5-CENxae17uN4m8ttWG3xUzF512xS6o11ZbWgmz-JA2y5hHLwVst0FuTw1wVyyOC9lxCNpz5Wghh_ebv2WF0VnzVj1i-QCTrsrNe8NWxxMhG5WdNFre5d5GKDOL8oUK1orJ6TmRvrWjJNGeTLNE1KVVur6PBOnHHGKAmkY3B84iU8RkVQv-k1v7-hXh5nfNPtlWycjFaoOYXm4wWCLXkhrBGaZQFb2JImBIMj07XEus2pAQdpfc9aBesUdO3fjXNP_4q95gfBGd5OZEGtKoIp6s9JJPNqIINHj9-mMAMx6De_LepOohUgmdukQ=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaUbEUoqDOuXZOZwbWH6abOphSDF651bHSe_nyCi4OmLsXaoEDZqKv88NiyTQ_GPyNkheceSc-0prBl-6PWCXu5Jhz9ZpWpozKtBPKUc4pCTyAkKAPY_QigaUM8cKn_atzGBLAhx-JRebxnbvPmfUVT5RUr-o-OmLUxm4kPP3xQ2HkxLEiBbscuDepyS7XAkfSsokSVw8sEkLY74E5-3SiFiLItuOZFTfsCAQYxPIh105lsYl-R73CNAnx52VGRjFlv0K2rTWg1nrcBsa4_KQnUYX7WUxk8e_zrq31AotAR_PewqMW8iDQXVMPnaV10_d54X10fWi24Z3RA87OAPF9q_ZwZxjTkW-ncvdnBjn6tqWMdYqEKBvO8wlnekb2VnlOfpM5ai2SeK-nU-mgTyensUq69UiUtB6DfFpVYisquS2F6u6eHW8m3_eG3C0K66xJ6sNJpUlIV7Pm-Pk6IVDwf4majvkXc0YPhctg9LpYs4oQP-Aag-xuLpicot9tdcYgEKZxrwrO9kWZ0UPpi3W1VZs_2ZFttMQDVp4DlFxu7I436isnRG5prlwXeE6VojqHUZbcUmOFskOQOFT4OL1PjwuRUT4nPF3r18iqi0HiFLW3a03rWQ95yF_pFqNb3sFf2Bc5WDQTm64j1tJTWHOB8yTctfJpoVmOMVNEmTGpEUVv4FDWparX9fvzlxWx0eK2EtUfHCzWESftVGZ0S00TCylO1_O61EQVuYSudEwB2G5bMTMj1No2ZcI076X-OVfMQ33AGeq4kyJBCFiyj6QcmfpZJUVp8IlYeHc-po-ctRc5XekVSsM86deUtO66-o1ZqXlsa-ubYHLFbruY_DyO7rQnQYt9koeFIOCGEs6SG5VMOrdmdrLzyqTLwZaGp1uPVg-zTHWe3R5QRA2VAOsbek43k=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaVSbNqDrIbSDLTFIMOCL64qaF-H3XFNCaZxfCaiVW9MOCjJGfKUzmDwcexHk_tm9l0RFAWL7ZiBOGH3PSZ1-1XSX9VLVb6RYGRnUE9TRqb9y1tNgNdKZBaDFroJI14YINUpnCHUjuAQdc_V2S7rSFBZHve5npZmRVNEGuHjlKuEl-2ZFcnwm_XkY9d1Jsiz5dCQkivxvizlTpHDpC8zmFlRR4-biZsMiECo366OiqyOxr6s50CDcNjUn18EDh32h_SbaNc7z4F5WxySTZ4X5vq8MUlflKWE-x35YFm39bieXVcRxQVqhz_xoKfGd4s7RylDgzWnXeWZdaaCGBAkUEEZ1ZqfqgwJ1BL_7SJ-4Np9h0HlnC0PnAMKA34f8j7zcQm-CSGIwjCrpuOnhhVNikecd31ap4xsSYSnu3sF6UPMrEdY1npXBdVhA2J9bGg29n2KDH5MIKkC5dd0APNdhxL-sFRmc4rqIk5rByquZu9jw98ayccyCj1V3igNbyFRrG0C0aYNY24Bo20IGbSBOoa5I_Hn8iEJj4DhknpcDBxeonTKGYE-jbAW8PkH6-gWVZ3v_g3Jvi-Owa0jJPeUCH8IOdiAIPkCnuUZEMRrHZOlstt1XZHUrWu_UzSYWmQayY0YWW2leUkOipAeqarQSiM_BRCuQHeORP-NmYEKPo-VPgVtIGihp5fCp0NVPCTUcgfys53oMbVGse-gkhdEYGqbwSDhT1hCwc4YaT7SrAMJeLq56g2PcFXXrnR0tbsED12uZsEUdd1dS_rbNmonCQH9xnmchx7Twvugiq6ovuAGgCtuiveMZy-cXxhM-47NjjrD0ijbxnXNi32Dv5mSboSEaWud3x12Qt5k0FC7cLXyhr8q5qetd_CSVYgkYyfRpXUKX0tQVvUm8N-D4ZMUNF8pl9g=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 3.5,
    noodleDescription: "細拉麵，偏硬",
    beefScore: 3.5,
    beefDescription: "有6塊，帶筋，不算入口即化，但也不會很難咬",
    soupDescription: "中規中矩，顏色偏淡",
    wantToVisitAgain: false,
  },
  {
    key: 3,
    score: 79,
    storeName: "老熊牛肉麵店",
    visitDate: new Date("2023-05-28"),
    itemName: "半筋半肉",
    itemPrice: 210,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaXEGsD9EdPCBTUdxIDY8V6lbz35S3Wf8jYz1c5le_KwU519ZO-le3VaqhClY9fUJZm8OKiI2ZZRWIuKpUWlWcvaaIlU1BokLLOy26U1zeSCd2O69EjBo1UIL1YREiWvJOJppROSiCcTy1QiPVHxY2xYUn73kfW7I7wN1XoJ7bCGdYB21AWCv7iYUoEwl4bTYEqxqAockQdL0l7CU8pb4CigNt0OznY7YR_kf0yIWNLTi9mfzBabct7Mv9CemuK8rSfyJ_U8DsTEv6IsTfrWwIfVrrs4TwcpyaeoyF5Qi4HVGXmnrmBrf-NOCCFFSN54PowkH-w3t81g9RW5xE-NqqZbyfQ9E5kq1yu-bEFvb4vWWVl9x1o4NyvMk0vKOz1JvqZ9ZyZCX3GSAVG_jaeRRoIGONPM5eomm0jdE7ALYY-FpWMmCdAGu4A37Aix1B_5iteXExSEtftCL9J0HjjPbC8jNvitC689jnPQXtiH4WHkdUeN9Pc6M2JKR1vkwiuYMwRPoQth89sBsZjuFzsbxFy3MOvpsysDYJoEjCiy82ghLCPOHXaNr8QUf9n-36CIceNXzzftEpgU09S9PJ4A7E28QLV5uDFxUVkt3cdTVQUqPt4wA0iUAEIO74Z-HpjijQGbfRKZC0OfIeMpbDMlemE72JBIqrgwa6HfUbWR82irmKioV2qlNwCtKACsLPTe3iUMKY6r83ucc15ofQH1_wXvsmk1b5_-aTSCmFKpL1r3H587rhI43-CHjRKiR0HK0yfyFjykY46CYLWsVHrgEfm5AMl7R_eYhm4SKY9Bb-C6ovAfJCxm-A84eDpskse5qJN9q8sq-RXUyNIWguVuyi2f00XzuJ8VjnkCvjKSK3GAvffiPT78jaIWpmbyRl0Dah5KJkPVIdTFCuTS4WrWfsM03dg=w1635-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaW8_pvHSC-Cebo2a_SBdNzrHBomymMUykpf-ij1VUyIm8fzm6WGwlTCgC_drtV3Z-6NAxRm4lk7htSB34BrCWaWjJ3A6JmDouMIqbaTbll77515WSJFFmeP0BGOgKkgw_yDJvAtR8aNnptHK3WjSHLItmMhs3xTH5ncSgkOASos3vpAOM2X2idCbEI6D7XyQVsUiTDrGoHXfGk-3ZhjkwcI05-bXuqcMa1dSETFRJRuPqwt4fjBsejUrFT16yI8eVjj9rM1qobZ4nZgAQWXpJbQLHqTZbzHefhajuuT75dZec_6vO4-RI5Ljg5kPXu6-OzIUaPAyMiAvKZ7k-v0DJdaiIvJ5TpGD6kYonVs2Be_gjZqoFugrSbB18WWfmuZuCZdOfM1MwF5T--NVHIkZ5iU_0ohPtA0WI06YMq8S9IbCgpNSDpKlg9JaQ1fYhlS32w7JmWB5SIPgpj1YRsFZEE1yUFhWFH0nrgtcWbNjnIfXe7hIobOwF_YdZHRVbTZ9FXNgnoqkfNBmsGM8x96PdsEYeWwddpVg6kY71RNxieIz3rJj6HPFbbn9yC-mlDLQkMFAuGk0y7Z6gJqDOFnEH1jwWVpiwGt2qV0V9MjRqimJWGE8eUKxdx3jTUQsla6oezdzEEcCEuewkhWH4HyCYLtrte1nAMFuEBXPCUi5JKc2L1SZKymddD2jW3GsMCAFZsJn6uWTnJDgJTA58cuUYhqVnm9eLF_jzSdryGEZyefLsya0SVx8qFpGaEkxSGW9kLFfYS5M9T5cvfuDRkwKCrtmp9YrrLM_HBx2-sgX_3K93xWqKGn7N7i11MbM2TvqBH2C8fsOc4Z5JmpXSWsDHdSrCbHNhm3VN5L2NHWVdNCKsr3dvestBA_KBQEdEg3EbF7hOW2y0WwkcKnopzzjAFqEjo=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaXHuozj557KDhDIhfLDOQF_VTYEpqGlx3SyGEmEvCtbbgY6PftIgRkB_oCzTya0MHhs5CqFhRq_u_ZqR8dZ0R-qjZizSRyVPkDJQXr9M8FPCZPba8WS7LCjeO4IkGJIbmTqQ8vFT9RimZQMZY4NLO1EsZpRLHuydFcES3OMK6YgJQiU2NEihj5vMAvSM5IPBrtjOokcW3ShvgvE-aHC5_XPHUS4WJrdzncMtPRe-VW57G_crvUTFho6VjNmMPG3eCYnEw7KDr9cFy6kxp94Civ6611uzzHlF4SroKtbgOi4qZLnGj9UcSfFhw0wrRFTUaggraw1wz4DBQnvpqeu4VvLHJ6tDMMNi3LjksvrrLzxWF-sfboq1Ml1eOk4sW94ajGMlRo6JxLQLcbzX4e3YG1v-M5ypx5fsEq9IlsPFc7CNAGYpcQ4n705KNP-n2G1uTLD6I4C2plx_bcW_BVSJljmyUVBgY-jSLfW9EI0qNY4sApt6h09zoVj3naYVupDgMCx6kuqUFpZgyqhYO0Mwzi1VJCgsPUfDPjc2yWgKIzLxKpFsEdoPi29vDB27hPQQHuJWAGfA9-Z9RPtOQzQ0Z67wdM1AFW_if-ojd3bTeGCoiXjbHoL2VB218D-foFY7QdHpHWaWTIZS92G4z5W9xcgkUee8zdJ3T8vSKA0Kw0vNVNr_ONSnEY7jWql3uYEegt7H_IpIIyvZmlCuNZf_EwrKbl4xxb82Cncf1Oq9sNfTxbPhOCMoGYk5dtksdEJLeVZAAp_eXFucKbO9hq2iBN-QzNicNRXKd2NHv3l27YhTbi_W8B1n0bzcugGReKkL091ZcjGWAO02zOoXONF2ZdMEKkRHMwTmsYfq3Vwnz54XeJ8tEommlt2e7xq3L9pNVZ3Mvl_-RV8tySdQ_fp70TgCCQ=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaUWeGCQXT8elkEurmitjum9D1laF7Gv-E5slcivBbDILI5PvQ-XBJRru-KTOp37bJGGsSeGyzlGHB1zeRrptYbx9-3EzmB3vdWUDEb5I-p63X6kksnUayPqNDOMcKW45QHy33BEhfAc5Fh6Y4-Cat59x_TsXqdAVaHzy6vyx6g72VpLnZ35NbONBk9hs8iSpjbiCDc2EEDmonmfSf7WVEW_Ozin_Sy2RrBcLtEwq6APWtli5koK7Lin_VHAJlG05KB9BfM8jzSaqXmBXXVh8wsnj12w0PYFSSkUWQyYbpuKs9pB58UjCEuB8EW5rrjlHt0rhREoBem3f_TuxD_o7zjc_yo5Vl85ZwjpALHEDiboT6EhLCbAm1ZIENUUykfrVgXYHkPmcpK5e1E214RPA1sI7IB9VZ8amlOPipphO2qCPVKZa67ArV5ckMnhEV6Mq2LmDqdDtIbCovfUrqcyVevnv4S9kYXMEPE6La8OTzgwcGQO9JZRjfdiYjW9TTkA2mExyt0LJMr_x_1QMJM9rP-KkKWFZzzTOj_f1ySSU4POpicEZpQ45PTFwjr3rKUP7CBmOgvlHy7HnvN4BG84--vUFjFUIx1F7_DpKlQStNTaqX13-qCDD3crsjqXSquPoX0nqUP8iV4onFzX6YQQm_j5X4SBqg6BVuecKu73oZao9-ducqnuDJqxIGwO-8jRxibdyJGMBmw18VHtBeAILN6GCDai8ZS1QTt3VXKKPysO8MrrPsUzoj0nPYGefvHMicox0sPOkZDjG0CEWNDhLITfwDQw6lr2d_tWTow_z2yUIvdJRIXTYgJ3sRFLOg3QCn2P2842qzpOHSrNXrG0WAQkx6lnqZvGsNxLF5-8P6N1ZRCsT0yD6lG9lJr8iND4l0oRl4Wr32LdLX49wpURkWPtaD8=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 3.9,
    noodleDescription: "可選擇家常麵(粗)/拉麵(細)，家常麵不會很難咬，算Q彈",
    beefScore: 4.1,
    beefDescription:
      "本身夠軟爛，但因為是有紋路的，所以沒辦法入口即化，還是需要咀嚼",
    tendonScore: 3.7,
    tendonDescription:
      "不是入口即化的類型，會需要稍微咀嚼，但還算Q彈，不會很難咬，但牛筋給的太多了",
    soupScore: 3.9,
    soupDescription: "有點小辣，喝起來讚讚的",
    overallDescription:
      "地下一樓才是用餐區，剛進去的時候有一個很香的味道撲鼻而來，雖然用餐區看起來有點狹窄，但是味道我很喜歡",
    wantToVisitAgain: false,
  },
  {
    key: 4,
    score: 75,
    storeName: "五牛汕頭牛肉麵",
    visitDate: new Date("2023-05-30"),
    itemName: "半筋半肉",
    itemPrice: 150,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaUji4l2Wn7fPZi1qoVMwg14Z-5NqiNUFlkLdey1sha0X2P3xHBOuoMmMQm1R496mJpiXgKahO_gn5UvQuqN8XCdYPBowgRjS-ybMPw7V4qgxQgdOcTJcP7NGaqaXHjNNboSSXEgEegGUfubtlvoLOA0WpAHNQguSPOym60xyqQQ0_1_D0KUoS0r76bVQWXrJZw443Kfs5oGCJZOSOSU5a7k3cv74ixhmC0VdYfvIM-xYoEas8VkgRuBC2LALXzfOzVW-Mb3gjSlgBbcymRd6tu0MUnPms_0_MjdwrHYOW4CC2AO3ui1Fdey_2vfvL0nKvw-g4e7JfD46mfImO5WSj6JiFQ46F3Hwu5oLQkIDv-tw3Me3Z9xDf30NRli056BTyf6iiE3SWnm-FYBNhNOds1Hxpkh59ak6uAWOAnCSDoUnME5w0Ba_vWtoQ4xP4VaKUtbNvierYJoa2hzX0RWKNw2rEm91424f5kmR9ira2raLgJkNLtuiO1svPSgXyafaRsRj1PoVSQRC8jraodVRkESBPsyVyvk182O7RVzZYivlIbujgp84-V49OEWmZiziF8CBrA7B7qZInEjm6GS_ZiWFiciBwSwjgtV8TdzurZFKhrFIhFnZcsKcl1PdPqaPo2nJKAAaXbEwAgcBeeV-5yo7w5LDvezjZahhNVQxBS7gvs0_DrWO3iapMi40qGDnT5qE9H28KWAkWecfZCFCZU4Z3L5Fv6bmJm-t7yCMAkzUd_0-ALb-K1KJYPqPzOE8U8kjCSYhWl6wjSK2dfucV7x76lQS53sFx9a6-NM8O-eHcvfLdJvsal0vr6W1Vj9w2qNUvZZUbCZcpZw9KREIqfHI2D6pB2dSQ1jBldrROPUx9hb4yZNMu2BL032uUP2SC7URztf7qqerFbJ_npx_-DLkTc=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaXIpBrRLC3Yvap1e786S65fdORCSMs792wiOivw-IBfWf3IKW__qxO70RdXyl0VPJPmBrIjHniKxfTO0B-yCLPx422ho67KBJso5K5WB1zCTpH4RdeJdOFZ6DEWfNV7gr6eeoTz44g2WUbNCcjLRwy-786Eicjvr5J56qEuHf6p2pH4YHyFGZ4He037pvx2isvrDQ0v3gu11DSULsCp93RBC9pj0IdAesUJG91sPPGFMKh3K1EU9uxWig-pUFn8NiRsEzrh7VJTzYKQoqzbWxsF3-K5TbX1f9AUi91HxsrMFE07kvZGPNKupQV78THy27Jc8aShQmSWeGsApZoDVMJ8mGFsK0eRBVis9MTe6bD_VKNatiSZNEpZoDjp2dek_NOANj01WZ13LJ1OdOdNQoX2vLx9GelSMzsXFz_OyyNISEOlIOWB6y__JNltVR-Z8_-KFWjY0MatRjk2SvICFwwlNuCPm0Xohwkh833B0qosiw1mqe5TrodshdIAf8Yn2HXtXyOduj1NVYFW99nF3V_ixe7gR54czm71sTD9oPDpL1GlbTb3pPFByy9Eqz0YgMi_tjybGCDpLC0U6XSzknzg6U7TWoA5qsXBLpzOS98nvsmWWPgAFxQ0hP52UXDRCl2mfFGZ_0afDsi2XnoRXBsCsAddWMthn9CdZImnoGmckYeV1z01eHcEQcdK5Jm8bvNA1yvlDbchjjgazn-IZejKgjjZK_oaCvO7chDFJsQKfUmaAxwlmHKyglB8bFxtz9IyA0HqzPTEIsYf_iNxG6uqt7FicRdxT2gg26XKYcQlL8UJXtpvV9F0Xk7RxZzy3DgDFlcO0sNBUEEycCJPrAamsNkxvSGu7UFYAUsGlbR5s7spCZHbuiiY3am05njvNA8mu_epV26_zscI_BmVHU5GmMc=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaX_jOy15nOBHkt21ZZc6d4Eqhw32-hVIDb0ixz1ib0P8RkF0S6xAux2wD-7DxlmJcRrp5mQtNKzjno88HhfzUCupGRvJxjqBNDe8E93_zh_TfGoIs6p9m0SBzFLP0ZtK7oZR6LQQmY9zVUMQjC3kI3A_M08FqXD8cu8pqHMj2hRvgokkwDB6vbhSVnTMYViXNZpH6C8HGMvbCL2XK1FYG0NX4L6sldA8PTGqUcDspYihkT8p_GuU9klLIxTae52WljOmA5g1B06hL4ptWoOU3n-4UQ1L2temB5RzaCJxCZ6lT8xvswBALz4hJ2IjwJt35uV3-UAAal5GvLSo2yH7r4sYfZuv-bUTB0iIDjXE0eZ6kPmJy-9zxTdZYvsBnYjUBxNPPiJTGsArYJ5yhC7lFhnaPQ1MpDCy3NZ-WJEdVt6VxaKckngIDzOdUM_r8gdWS9C5z7qa0q7FS42g7Fx1jQ3Qd4453k4WXtP_bkupMbBh4NCauUOpdWdK4X-upqyurwMJDQzfjgY07b0gOjuMFM6LVvllmKIyQ3EvAryIqJNX2qdeNRuEDq_iqzUusHcbsNMLLVce6F1-y28s4nI2MYRT2dM98TZWVC3OxlTbOUYnv3-u_DHyQ57bQ1glr-vJYdx84Wfenr3QbaBF20NPAL9L1qi07QZdbXidVXMd7gpc1x7GUQT0FKR4jW4e_fuoQogK-KOTSitTBKw21lPfyhOBy4b2YaWQQZFW2FvMYr2rCBQabG_9EKF6Bk3jLl611RM-BTCydzlAAEtra4UikMLJJBm0YfOrgUgqJzrZAT-OOzXn7lSBNUAPzWlrfyU2COqqU_ronYLJijl0-O1ohUYh3Q6n_eoOi-BWrCpuHHt3pA5zgR9UZkO6_e9MhRyqTt-A8T73nGJss2imNmBXSrb0BM=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 3.8,
    noodleDescription:
      "有拉麵、細麵可以選擇（照片是拉麵），覺得可以再稍微煮軟一點",
    beefScore: 3.8,
    beefDescription:
      "牛肉也是給兩塊，是帶點筋的類型，沒辦法入口即化，跟老熊的肉有點類似",
    tendonScore: 3.6,
    tendonDescription:
      "筋的部分有兩塊，其中一塊有點沒煮軟，另一塊有軟，但不是入口即化的類型，Q彈的類型，還算可以",
    soupScore: 3.7,
    soupDescription: "不會到死鹹",
    wantToVisitAgain: false,
  },
  {
    key: 5,
    score: 80,
    storeName: "昆陽牛肉麵",
    visitDate: new Date("2023-06-17"),
    itemName: "牛肉麵(大)",
    itemPrice: 190,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaWp1ZrMxJjTZsgYxG_Tjkqb64sIhHzZdtY9xNVV-fgwJ7P57-fOixz6QCr-ThfFXdzRmhLqDOgNQKeRElXGodPkZcDJ8lMX7GYJLVgkj_gJH6sj9T6o7wcWpgnLTDsnrqB-yDrSTd4ONjzeKwspbBiuLbjsTSj2AxtyfrK9MsfIR3r3WwkEZQp1SmrVseghVR2b4Sl5W7ppEfw2DWbDlde5PLJf_6gQTReZtO6o5dw_E1R3UZ0VVTu9XxhlOqBcc2KN5xtmXFLG8p5H3rcnswBZ7oBCFF3FOEbl1domuQ3zRee18-S3-S_gsiJj8A8tqIDl21nZS1jC6Oa1m3tikrpeLQvwVhHwNVw8UtyUD0EHZ3Rb00X3pdkJM5UKVuJtKUjS5F5klySc1nqz4xiACg64vu5rifKCmVltaothEQ5KrJNZOhf9QuKOp2loO7ODigK9l5DUuS_VRH8Sr0yETVKQmUsntHUmqyNc1Gj0AQB2ve-5fnkFc7JjUdb0KxHmEJ6KuAxRu9A99eYACFvwmf58QKxD78heHgmEx3J3GxmCfc3pbfzDRQZ1an8Xf4pO1INXvJWA2Mt2yAYfcxtqLzYiw_ivtnBJ_CW8TFpxXZluF_Fimhk2hfu82rN8z7e8L8fPaMrl9zyN0b_iFk_QuIr1_Sgkg2eLuKDlDYtP0mRh7PlafYRPCf4vd4yt_2qbaoXoIhy1-DgeFOjo6DC_7wg5sxA961BHp4455FHoy37hnAxkBRME-SSj9jJyM8K6o2dgdKZ4lb5dwoo8uz8Ar5taiPec7Hc-fvkWnTpYc_XkyQ7hBrjIOYw4-ReoDUMNcwG02xqy2RRVDl-26FRo7CvQppwF_PHS2FW52xywanoRTttHjcDU0QzLGEAbzr9XEHS7ZERAPUKHgYL-tGVxOR5aXm4=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaUg9ZqbbW-WWfYoCjtAKdGGVjVcuVpCYsFDLZ7AyOKE7-7rXnaOPP-PFCyWY01g2PjJJ_w2JKNJ3EFhn5o7KHZeFEu-gris74VSSD_zCngktNvGGKOGoZPC1ICSjTuyja7pz-oeeT-3-MlPkb28YXDd-TnS708Yud9CklLgPZJce_attkjZx8SeGfPnJb8MtkY8bo61S0msXEIx9kFdabNXUOW4P5UOZSJdT3wOQq3_bCtE2-NDm5RUydshCUo0xsvVfS2oCt6LPNfUApVNc-haf8tPQCsMoURC8Umv5sBf8oQU4VtMQSF4HGdAPoHB4HNXuuDUHl07rxBKvn2bajvUonLlSitAg92eqsU6LhK-RDbqcKnd5E5hxeKnZgUCHDnYgLz2Utd2naTiDHZBCDOD07mlKAXYLCFtXGqYiMxQseg98VW1-08Dv-9Z4E2OElfn1OGLbgmfLOMjTF5nr1DFKHW_t0mb2dQSM_iRujkux2qE0MtXn8-C12tTeqwR8Rs-9htnqsPkSSaSiN142KKV00MvWke042C0RmcXOrRoz055bzTMjdD6EzelYVBNbIe5ioeosmSRRY9XJJl1XiQNQlLb-eUYSpSrzhixecjH8Wg0xb_PNAbW1GkGc6CxHlVHNY-tGZBGU6HRCSP_3NSkJZ2AC-m2QdfwLIGPTRtW2mjkHkoPipUHQJw6nUz-Wvdl8dSwpCEYU8Rzsr3twXSqkmYj-Y84j5D0y6hVFqYs30--N2MiFNB-iGt9ielVImLj-pRYnHH46aV1PzN_yWblTe1tK-Tjo_IjPu9op7al0aP8Y9d24zrzYFfHBxOpBChD8e0-hTuG2AEdknge174CZbCFKBPVhuqFqh4NxQx_z4EQb-jcZejTZUkD6GazlMWe4-Vf1Z-Xr7ss5Y_0Q5zHjwQ=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaW0_S95tOFJEboYTnp9xEo0N2yOuAOCM63XVc1P5K-w0-HWnN_e2aKR_u9SMbLLjVNH_9Kmt5n8r9pV9FyNtC9QIZHN0N7vw2MBnVjZjAWEoLEyFJL_Ry17NrgFEwOKTQ8bKidNRTyZUETxhO3XwQ96bbbhGEkxOSFtQdV89CAxc-nFZqYOOLWAA5iPeVVkjDI4vUgSedd07sLMfVMVJFPjKkLiKXu39jgyjAwDrhoy-umRNxWJLjqNOKBbSE1edGjNAyMxhFFfHm3YER0dhtpzymDv5d1t658PUs3BfuB6NsfmzHPyhrj9HjGW4Xi76_Gf1mhD64mahmbwwNoaXqHymyL5T4qhj481fr4G1Ch096gYrLq1HGUSsmhSytmvXp_hbCuqAVfg3-WL9QS0Uq1S2rWKUd0O9ZZO3LbMAYWhGW8z_fTuhljA7MU5ySKzPNfbJjDOvFtBFC6-snpqsXOhcuSux5Ev0VGyMvIiuQta_DURqUzLRH2GP_NfZBTpNaK93N_2KmCAe0JoaMItHDJKtpmYmpUKIIekPHaVEVTO0iTpARg--IYVugLN1OvxipJ8sRxjlUmoKLIJn6fGpGdtIDWa4UpM82OuSiY8ouDOEFVgIssmWLXl8p6AjFjwvcmetPQPtBGy4wTVPuATBr_ITLtybgJbWnyopdvpSNHRm5_nu-0MNhYiLrqaJSeObK9ADlqjCB8UaKMK2fnEyVDtaonimtCP-f9nZDPiAt26E1j9EuaRJ6H7nc_8wo9wra2e3wP9wy6zzXvpHXDX_i6Soysu86AvMADcwB60aOfon2yueNGS3BDa61QYGDfpHAByXh_tHBZvHl5DxA1aSfbgjvuPiihh8DHii1T2iWLdBGIoJTM5Yzu0YKZwt6IWO5TVQ8xpZBC5GrtYF0fG00yBkFk=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 3.8,
    noodleDescription:
      "大碗麵的份量，麵都把湯汁快要吸乾了，覺得碗如果可以大一點，湯給多一點會更好，中規中矩的細麵",
    beefScore: 4.2,
    beefDescription:
      "肉屬於全瘦，煮的很軟，但因為有一絲一絲的紋路，所以不是入口即化的類型，這點見仁見智，但整體我覺得牛肉是整碗麵最好吃的部分",
    soupScore: 4,
    soupDescription: "湯頭濃郁，有點微辣（有跟老闆娘說不要辣）",
    overallDescription: "建議點小碗、下次想試試看家常麵",
    wantToVisitAgain: true,
  },
  {
    key: 6,
    score: 82,
    storeName: "老地方牛肉麵",
    visitDate: new Date("2023-06-18"),
    itemName: "半筋半肉(大)",
    itemPrice: 210,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaVFrZX-pR84xNJGP8aUY9WgMJxHB6HRrhX_mV9SaUQmEzj3C0mTwJtP6-T8Wj15c2frpH8ARPpNPx4RknHtfDtZGY9uMO4MYO6hfYXrz2IPx4EFoCVdBl6nYpQJjvBwxkAJlEiWVr3HN2OpXIcxawyHkB-DqCZHUWzrEvdXQbOmF2lDrasPsqWIMmgcYo6NFPFKvJEGrAUyEo06qE8d0mnLLMC1FjgK5CRMbUfAvU2vXwj0mRb8UfUWmsCV5gsM2DM_ZYvyL_9EFWnhu6XtPoWAjg-EdcEGo3QEpWWI2zIffGyPp-z1Vsfrac2EnXWCqLNR2tmiIzkjPldWMXD0g8t5t7OFja2p994I2HixF6DcqmhvB1U-g21fKQ9uRA4k3XiDtqQF399UzOWyZBrXVqNGO4N8j6Wr_s1QevpS_T4rrG__f3qx7gE3pKEtp7ruQxsirPbQS8uBHlUfPt1u80shQ5skjx_0VWgxlmdKfyjn-7JQOj7AyjygFcMHF9Myqzo3odTbi5VBYYKdfFUUU93xOPtHroqoloMAl_QHLHsKga5BoOMMqOjZsA-ofHEKVl2HlIIWxO3NHB0QYLnKwVE7zumjW8tFFWMvz4Z7neOVfn1VTIi4ZVywRxcnYbF4L1ZXULzNzc5FSJ1YoRnMnBAk8p0UPZXzlofOxnNY61-iCIJCQEv5aqM2y0LkNhUgRln98-181OqIWJWXq51mvUTkLZk6eUrckcAw28jcobVCfzhkgIvQTfWsmPdnHW7sLLVQ7nXkjFWy6WsW55bJ-C0dWd-kANpIod7ft8KL6Px1yN9S7P91n3QgGn30JdbpKRiP4VJCtW5BfdUm0I6fGfd--S1NJC3Dft4qy0U_6sB1WZF3NZ6iEBmnrWvqop0mc1NzRKHHL9gD0jkAw11OwJRSjPM=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaVNE8VCZ_bSVbXed_f5aSrukt9IuyjlhOCVeEI2a8aHjzSGiCmjlTCLbS5T_CMYEC4TyxOE1lp8UNf7DY2hukLhCxVRkk_Q97GYhq3CcC_eK-D6sokCJ8oZ12J5t8jhZ7gJQGJX5teOrEiiJ_MNPkmzdIuIE7C2282kdeyT0e8P5hxf6vdOoRFBGXlGVAp-avxv4TWN0S3cAbAJcvAzXKgjJAwqpjiw96MVoIIqz_Xyzxc1vecaLHScQwF2Wu1SxWA09MgfKzIzvGrohf8TYGOYux_xsxt1jEah3E6LmDf2KTtUg3KMjd4GY0OO69hWu5Ieh695kubQyoDEAA2h2Q43WbIoqL7yGcb98SrtEpip7Y7_BCQhDHg8YJZ2aQH8cEfOGxVU0elkwjTTVbMNlBBCDCJNX8l1O3tMlYOCbI8VnYyzCGHiAVRnDu4bUmIne5WKXm7q5T_y04wXz0yLAp5eNrpMe1XDgbApAPAP351rgQJn6Pc6zY4QDDvvwB2pk8UdMIOX49N1cdEjXBOAK5NjsdMES5WgjyAWahWyn9eoYHRSSX0lXSKZSeieewS661XxhMeJsVMFJIYYVMQu4RxYacGl4Iag65PPO2pZVkr5RYcjIJ45cx-WQwhBE54zO5ljyVipqPt6DCJxy3lRM0WW_O65AJhxhpPkWGRII1C8h9CQ0_JfhwNPKOy7N4F43G_GCTROexEbqmLhprC3Su9O4JcrylZr-lrmFknpAvaNHEC0tA3rrBoux779r3tuK1Vwmm72Y-a24948wEd7gdhv6rPCi83ZI7VY-Vgbm_rd1NPP2nHJ7_tVNVWSc5gnPjCI8i5Ec7yZ4bb5hGarogZiekWXVeqNCnu2DZk3jn_YR3PIoCcmCQxhoL1lkB4J6jUDVAHdM4x8SfF1CgSTneyGztI=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaWmYNBHxYekPNZjp685S0-9p84D14N4j2VV3F85NkC7jRfTlz8Ibyympf2Nu8l_H1wbf5iTSt4xjATMVvERqGVMDCsLUO8z0W7IDXepl_YlbhIGSVPcgBVYBEx31NM62gMNQxbdcMg8MyJN8f7MvVqmRxDlDD0RpAvNLZTpkdksSdP8hTkPOUEDlhWJAXj-LZWcKkVJfx9wDXIb695VIlRLuX2x1WIEB3ep3slLsVWnZKyDKvgAvvUEixQGyFWwqf5o6DWSJqbDaIuChGpgg5bhVzNfrf68T2oD9slTOm0uCWw8-jKozpUQizGgme7Jw4exNEj4STbSOUj-xEQUuWI0BvF16xKPkkQ1yVO6uAa6K_R-z_2IXDOGkB5FyAFRfIQGuRQvn_tegbHLjJHUIVQYNLPpZYTTsKsf5DrlMpqPM1eiv5OqIJNtsUoyrR0u0N802aPHKheNQsImDCoGJAGzVQj9YUVp-h5Bii63Xo9XIuJ9adEHGwU-91BvHqpzCOk-TcFEhpyItkomM-z39PwjfB_-W0uw0PxjefOEKVyZSVtOetAa4Gsqm_9z-puJfk0KhFLJeGknO4Z5EfNbxNSjeZbG-vYxVBhi8NMFru01R8UbnltDo-BSAY_XMQOKStNmRDXh8_HRDyU7nKajNjS5beI9J8YDUtiUct-CuTlg4btF-qA4zryCz-jFdPuCa1Av9IAVC7JjKzKFU56h7zsIh1fgS2etyoYN_tIyTDbwbUUmfbYGKBIUgEsUl5viL7tQ2olRoA3zNFcNCmXeOEFyoMZXBoopxqETTJlGl-7ktfQf71Wab3mMfPPLVd3OsmhvalH3MMyFPqIERdvpMsTXn1no8GCdwHJ1mwiUFz372ICZyjLnBH1WlNbpFBWSUeUQrZhOvxqbIBYKXJWYjoNMOcM=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaXbWSrcwCoP7PyrZIhhU2HIkIYDCYXhD_1fiDwXLuoY9BN7RdHyp4nGzdshp6GsXimRRJbSJSdeuRHhcg4Gqa8vNS75RHufa7gxTMfQz71Nw6YKkHE6wgoJLmBLI5cCE8B0OacBuiaG3ArJExbOPJJtzqcvmNbc0Bh4_dVj64tzQQIxBiAKwMT4rd8oztuFu9Clp-UInoMqbh42vu5KjJYHP488dy1cGWzo3nlD7tu_5rXoe059CPTzKEgvUd2vlz-oJ2e_6Xnyn8Md5X7oJLp9GsMgWGYePgVaURP_yG-I4iq5o2I_LRrETW0F2B5S1F7VPyv8ke_s6R6iQ4TzM9feEo0wu5jPtsEjc0rCdmi49PcAex8g_Sfb6MuHGynhosCYOg9vuJVRppDzOMC40mpcoVKtWc0VFIkznr5FpSWQhAg0X0FJtRXMHKeMSEe1zjedt2Wd4h2GZt4niPON-sdijF_rEuZj7Utq-dmx8RklbLpnlCTdHRQmY3HzC8_RRRGwyYf3aRxPVIP0zZikT5kQ0TinUIQz01UH07wOTUndl5ZiT9hU0XWX-yFxXJpuEJefS7CY5E8zhFUngd1dfEgrtCKMqslVzzyVCSOS0Djtm5IoBTLgWiVirsg6Ir_cteN1Tx5Rm14-afaDSHoFzoT2aUSSZP0EMwcKgiVOGgz1ji2yzgtuEPUH2Vp1y9rU8jRDJzCwyVuzDQR7TIG-vYQu-UuaSeQzkQqoGiiBD2Qv2U3LfXOF0IJcI-9ifaJxyoP6tKZRxhxIgi3_X2pVni45m40VxiuEKzOq0nPt4T_-AqiXBsdp907qjcpOBqYtHFAzj37dxir38p53rMBpBpITSabePQkX53OiUvnzJydYUq02d_q4XwqPsW7sTCzdbEQG5uCF-c_C6AtWSSY4NkG5qdA=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 4.4,
    noodleDescription:
      "麵條也是非常厲害，Q彈又不會太難咬，也不會太吸湯汁，搭配牛肉麵簡直是絕配",
    beefScore: 4.4,
    beefDescription:
      "牛肉是帶點筋的，煮的非常軟嫩，可以說是入口即化的類型，是我非常喜歡的類型",
    tendonDescription:
      "牛筋從我用筷子夾起來的瞬間，我就知道很硬了，結果就是完全咬不動，這部分我就不予置評，就當作我點了一碗牛肉麵吧😂",
    soupScore: 4.2,
    soupDescription: "湯頭不是那種很深的紅燒類型，算是清淡類的，但是也很好喝",
    overallDescription:
      "半筋半肉牛肉麵，可能是我運氣不好，剛好撈到兩塊沒有煮軟的牛筋。已有跟店員反應，但店員並沒有打算再補兩塊牛筋給我的意思，只是跟我說了一聲抱歉，所以我也不想當奧客了，就這樣吧😂",
    wantToVisitAgain: true,
  },
  {
    key: 7,
    score: 82,
    storeName: "牛肉麵．雞湯",
    visitDate: new Date("2023-06-21"),
    itemName: "三寶",
    itemPrice: 270,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaW-XwU_8uFiV7zX14O3oWzJ8yrRvicbc_3sGaZiwiGqVFT5dtdKsMlnmD8iWa6fLWu66vOO2UfHpA_HdFJwH5ihkwzpgoPSkHncPdKVf02r1ZBkqWQWy0M1U1qIci3fLh8zDOTYvzB-jYcEa-Bcm7jBDQiMMdfyKlbnalDYT0cpCL6Ixq_lstmYgAVR2ZSPP8JKn8pvvV6UcYou-00eaoksVdKCmG7duSAPABY41rM6cxcmovQhSFGAh_oGXT3OfGKZi5TuGDGCUJHOCaQc0wLsdbxPEot5VIzwmhEaPlR9vs_mqPbPFSlDF23uBOvkSRtJIkCEt1ySSjR15nsBnFaBIjCvBWp8l9ivP8KAe3Fz0ZGaCsY_8elV0C56VdjDy6-pbvjVjpO3Co8jmWbTka8p3xpRLQ1b7RT4866H4fMNc9KUAxiINCZKxgKS0ZvqysJa2UL7JrfKblG_0FPc_T0b7UuRL4Y96qLZGaBU9kmRAoPH3mpv1kOrECycByc52pEyEDb065gz0BemzYRDRTsQWlw97OU0n8YLjXqQgNYnrVqxxmQXva4UjFp2PT4DR5BBGgalTyfRSR04i0JLcZqIRFjCi1ooradnnO6UhKr98QVN04mnwHr0yyU_0eQXZ0-ApG5wkNEkIRcD9xwYkn0THWRF-t98GZHlyAkaPUmTUvUlWMNDRcrZHQ6U29R2cQ0nb2636oTRk6oqV_mYv789pGAyLrgp43i8hJjbvO4IQoA2TuY0WCoTdJqnHnN8k0d6f1-1KItQqkIC-OPCSTX9NuPXgaq4DN3NC-3P9ZRlDANEIc4PpxnUGI6PoS03d6FueECHqahxIeHRZe0E-CXWmNX_YKSmqKca9Q7laKHJPRb4Yp0nVtvffqAT3DB_v9d-B4aRjHvTan-UDmjn5cX-3oY=w1635-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaW1OeaDgwE7VZ16fHRwgpiZ6Y7iVXk6myBy-k3MIEoLpsRVdDSXYVIAw-IPVzQJguDqYjs55qV-aMr_nPOjN11Xg5qmqWnSGlYbBGmsu2c-Q4ha7UQK9CIdQsdSePmIz72zoHZtRP8H7Fp0toIhbqk6rC9G2G4P2gw90zE9uxSI_W0LGXaZMqbAbmIFY4i7s6vJWSyRq9wmVDIk_BV8Uw4lQZmRIvxvl3olrM8cukmuBlyGxFDPghnvzT5Kx1lMcTv9tu0y7t9st310phAmMpufhHMN8s-DBTSF7IZdcD5h3JjoWypQY-k6PxIFEyfnwDFkAgU4DNHCxw1E2AlFbrOir3tUQBzIFxDu6YoB_3EQGjCEslAv6CGNvMnRADIAH-anBgeJ3hl-jljP_AI0Y_WzPf2x8TxgkHAEn6-_AhP5aergV1tsrJT8VQLarC63xVemSx6dLoe3jLR2rYk3KV7tHB_VtEW32OirVPcESPtKao88t0GaWnGwCO9Fk9qvniVFWMxl6elRZ6jTpShTglzBQHV4GEOTX1AFdym8z_czlS9OYJycFJz_TSf2xjhX_Cv1MkUElFZ-D8m4BJvgUBDTHUtV55YoaoWV2WsefoTHDiBoPCG1agwRYpYco5I0I3N5w2-vYEgvDDMNeOx7juOWWvIKxeQoZ45WKWcPlN6LtKQra7-Ii-usVawNa2VTWSqPJLjzC_cOM7c2bB0Hki4KrXfXRYGqi6HChkkpc8SKsJayTH4i-5iJLKT1-6ZgmPQXtpZYoGK6tFcxs7M_UIzGpUtr0jOt6X2RRkZGi6BEMRnoGbyZsikQZ5cdxivWc3xjh1TEz-kaDJFttFHSUTAMaWVOIeqBxDnAx_vBHrTZQ2hpf6D2NUYdc5VMLoitHzFoz_2a7uWJIAUeyXIB-kkiTXU=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaXNEj_AZzLJZgeOxsTZXGD0jJo2y8zX7deEDULAHYcI3Fc3X3-b8K9QrmqQnikqC5xl-CljA8L4yOgqpJh2nztfkKKzL5nflh2Gc5igfmTW2X4qQNmXsCjMrzkmPQA3OWff_dMYeiAc_EdcKs21sOpVZePE8vh_WfW9gU7MYVr7rwwbwh_FKTzmiwajtJqieo_axrbgYhhz6ycDXYkzjsqHfJQ2aylXs4i52ejs5QjCpBBr1cJv7zK7R9xyzcBWLUaGtqYnhDA32QpLmioTrP3amN62LIDuvPO941XGLWrlq2SMV0dWQtx7Fq4UXbfnQsyVz-RwN0oBL6IcNVbrlCd-ObOQacA9DyuuhSOXJSHsEzm5-SspscqhzWMLG1jGwqEyGALu4y6vVUk9psguxo3b202LDauMvP2Ilu1qf8hlw27WT4K7K1Jn28KmbFDRBzahRoC2tiSJKYO1_GuYrANrDxfbsAh-dVttd9w8AOx11_LbKAhVz1WyM6ibA34ISo1hgITM7VLljpODWkfmtNrZ-YJ65EAh8jfv9Z4_VMAccQiwslkKsXkdj-X2fDeXT-pUZc7BvrLK2-fAn2P3Y-GGv_lrGMVVdbY6tRGXOQtCSorU-P9M7x6_IirQ8A58raW7dPdgIZ8jvHYZwYMVoIL4Aor7XsdYJI8QtsmVVJGTrq0ByQgYuuvHx6sUSEbwceFDKaSJiuZ1t3WlTkqbTsafSrp7Y-70o9ysghBgIaGV2Tzy6dwtRcMk0j2yrAV7MriZuDzYsREM1ZY_rVPmL_aFVbKUJCh9VXL0am1ZYKrNUQx1kSET6Ds3dPxIr0ZJDrtY4vkg-5wPyAJhA-mn7m0r7MLJVveVgjr6Isf7-LhE6qSgrnZ3Fm2kU6nDU0M0sQcHVgW1fLhXZ-L4HDThzigiheI=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaXFV3Nx9ER5_5tSvbjFMSY6k7mkMGzK9M5uLFWsMYZqXgFLlDPQnP0klDQWRGu_TGV5P-onpcUvwYwmXQkaZPwqr2x7-J8VNvekDfh3hINpXMo0YjNlnj-zadNSW51wags_Vbs5YHLyM-Q4Cf57ECejXF5uqMpQ3ZFJhBve9-QmvDI7vWC54RaWz2x-acYqH2M5jzlWUydNA58VagLZsB1tZZFmZpI6VCKkDR-iwX8ZcrzdS6geBZ731G_16enh-eP33fg_szZNg7GIaOWV7aitl5EEqHRhWnJ_FzHPEI0H3xq0NuZ0rJz7X8Wj0RIbXqYvuFaFl8Qdw_S_8xAjzd5H8tqJWoImbuGtM5X7gHOv6pjz0NJQAMivWEotl7ocjRSYZQpThC5hekpXp9_fKSJn48Zk6jKcvG9kzpfG4-BVoI7gMrAyF4SqbBr0xJuZouHX_I-lsGmx479VXRKOJi_tlysk4p2lhLSxLcAMHfOCYL6gxju3HcpNctVjVYcFoYArKPn1NVtbAEsarI7qgmdAQZ-vqpQXY3Vi5WQNpHAXov7QyYIWXqwH-8pJQZmdQVPSGw06ev1pOlI92SQFJU8dRgp4Et8Gfq8QiuENu50IIBB9EePwJHKvBFjUNtL45PwxXXp5JImtHtvOJBnbJpFCeEt9n1OLv5BJ8Til7H0lq-AOeJa4J0H97aukQq1mLHE7ah2hl_21XODmgHlNZA_Pq0z75MihreVxP-FFSKilktGgAK9YcddxXC5nDdk_SJkH7ys6s-9o0V_Z8XiqaFWMamatWW_UUactQpNNbd6j8v2mTYesFSsG8QaD53l2OWpzyhx6UOVeVbzjn00_37oLQg2oTtb-kdK1nSloOovq3xxo8MTY03Ynw1lMt06o7rf6CKLbC73JHZV6be_5TxX7gkA=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaUSRqE6aTWqziXntElYu53ZdIfqaSkTpDzUX7wFjzb4r02SwbeS3rSTPOU-sKGzVBljuk9VGWEZnUC55An9gBa8ssAjEFEKBesY0UAa3YqswnEXxwoeaCD01MQL-Z866wkBLBUxFMzOhd5nt-grgY2hQjruA-DF24c6vXsfNqomvQ9GrS1YV3FHfugU0YAhroxCS8bBUMKJqVAPSFJhuA1JNos4oUVEKkmbjtpkQGsQ_Uw_kS2tCaCGbnWdPRSctUd3yaxvdK53w279GLgu6RqkU2vWzcCK5sn56IA1kw9cSCSPMGxv_3dmvQbUMcnV490HwEK4xUXF-9wrVJXg2MC489gy0U3CARMc9sQJMLfpB3VXC-WNfwFYcAmgx9Fyt0OMkYRK0Jd9dzdkpJnLZ5lcPCIJq4htH6enbM6A9_qGT_JnVau2pNrXt3cWzOfWDRlXBO90DCK7CT6Jvkw8qM3EUqfmby_ajE7a-cyd8mAiS65zjYMB6zYKF0etMRf4kZaFpQ7233TOqIBsVkilF9U0PvDKFA9Wo3RRwKKX7QaTegGPWgyDZrz91QhwQiKs8lsLEcmEfHOC0vZBu3rbj3rHH7IrWr5GAVp7FkO6Dc_z7CW9qPe6NByGSmnVu6kkEf6udaEq0hVuX4bEC0bV4VQi27h2Hzs0jJFXGA3a9z7AT9X4qjhljlYe9-9J819ZlP_AgDsbzpuVYVfPAbSiguOXr-ZmK-LjTKb1aDOIksL4QpJnVMCgWPtvyuHBGyrmeL0HpM0AfRtd7uzQ1GxWRD1W_iE-eVX4TcLakbiOhipg_olVdjc11IdyRBe8gP0zSYwUovALaSBAOCrLyHhH2p-MnsJShVeuR7LKlECi3Z36Bh_LWR00TGtqBtNqmneDcdAxYyi8Vynhs9-oOOFNes2cCK4=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 2.8,
    noodleDescription:
      "麵條有分粗麵（刀削麵）跟細麵（黃色的，有點像拉麵），刀削麵本身不怎麼吸湯，加上湯頭本身也沒啥味道，所以好像在單純吃麵一樣@@刀削麵正常的情況偏硬（可在菜單上備註煮軟），細麵個人覺得跟牛肉湯非常不搭",
    beefScore: 4.0,
    beefDescription: "牛肉是帶筋的，一樣燉的非常軟嫩，幾乎也是入口即化的類型",
    tendonScore: 4.1,
    tendonDescription: "牛筋從照片就可以看到，燉的非常軟嫩，屬於入口即化的類型",
    tripeScore: 3.7,
    tripeDescription: "牛肚有嚼勁，但不會很難咬，但味道剛好不是我喜歡的類型",
    soupScore: 3.5,
    soupDescription:
      "湯頭很意外的，沒有什麼紅燒的味道，扣掉辣味，我不太確定剩下什麼味道",
    overallDescription:
      "這間店平日晚上6.才開始營業，可以提早來抽號碼牌。牛肉麵本身會辣（可以在菜單備註微辣，就不會那麼辣了）",
    wantToVisitAgain: false,
  },
  {
    key: 8,
    score: 82,
    storeName: "張家清真黃牛肉麵館",
    visitDate: new Date("2023-06-23"),
    itemName: "牛肉麵",
    itemPrice: 150,
    images: [
      "https://lh3.googleusercontent.com/pw/AJFCJaW43jHUnSqYMf8XQmKc9btDYb9-Cu8WK85YlG4CxDcxOShVPcq4ph_aCoUmEyjzoFAU7oSnisBlPYaFvDdZ5SRiyUMXSrrJNiZc3hOx3vUCYUf5p9xn45Eytmi2fgzDyp4W6rMvXOhLCNnTwUf4iPUVm2VaZVKiiK_I9aPDEH9iFQsYP1kmrmsaxfqQZcnd-q6F69s51UKbto38XFCbYWnQPQzAp3lL3SIABu2gQCHrAgjPjo_Lzs6ohigMbeZ7fdAZNl5A_CLOeFC_5g5SSYEZtR_wPfm8cbKFe5NxS05OM1l3JMP8KkLLUYpWUVV2pWq6CvBwM64vApZ0_n5QgI8aC2FDb9Qjk3y7Yq9tYXTkv9UiczrH-uYr1Af5URPVVcCAQ9UI5ZCIKzxbAdm96kmVSweEIMI9ijID8GQdjAjDlL2e2dZg5htgt2deEf1FVq9Sk4Dc8XXf1--gqcD5SOE1pPC_TxNwJjDIx7ZQT5Z4Ibm5GVCyFC21EJefrXwXbaO_nEADAj735f4JBJ58X__QSaJWCLehIBZpmeMauM7Vbu6oQaXVriZ1RvRET-wT3l6dJv7av_qXruZD0TIwmaRYVoUgwckWNSnqehZE847c_EWMLMVslIP2CRx4cVIym6UuobFdinlO4ljIu8F9aWypre28Xis0Z71RFVTAcEk9Bes7AJG9wM0QT8GHJRQknMq9ihMHg3Z8tBqbX_cQELeXbR1VG9nUC7dkS4OhySa7OuAj0ydPNg3M_6vKgs0Fg4W6cvKXFGOPNbfmgsR_jmDatleEkpY0JPRfupQPtq6QomE4U9PoMHJIppM66BirzHfrx3tqZ6l9Gh3gcCeeG3ILbhrG5DwC7gE0buIQXystQSq17u0psza7DCSSt2G4R7iIakXeuVYeWryq7KAX6E_FWuY=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaVt3giqkniKpxFCyT34fIuJu65WqiG8CKGuVDSb1tyqV9_28S84uT6MS5wWF6dNrUYiv4yVwR85w8k7e-Wh-OaaqFRShDbCDp1KDDmox_rk_X17Rq9yql-_S6ZlFYlM3_FvZt5MgT5IT-X-NBJ-9V0lLvtbZwrmAuH0WRfpvH8WtnzL1f1ZCuBKVaQOA4mtCT8COrFJvU0DsUWsP1R9UspKgfPxZ2AMRkZRornZeQhh6_QgQDhrCHNVG-OiceRWaDvfiftj2B-aOn91JwyQnx57XAjbMK7-MOTAu58e3_oxn5LoKrY9wrbzvSywXYmio1wptf2q34vWcOm_9LGlVQ2dvzanrfUUQThSNk2ocF2u98Dn6o5omLZ7DJLKNLExah9s-1QmwOmS8UaNQRbJutt1n9twzt79Ac1lBrql5kpC_qA9T15WXu24ysNJfTZS4JoJHo_bS2B7hxokMed7Lf3MaK_gX2URxCbTCoJJXZ2M_671CimszAxFrp5CTXGJdg4Bkh0gRORZKuOw1RtwEiqqqxJ5-JFH7Akc2wXILKhSr2dW9KjYfA6JPhF2r-YoyE2ATVjSjZBNOG9eU8rtsL6q-NdJa1v46oLeLCNQYRkkUxt4Otl1xXPHN4pNBvsYRZbbHpor1JlxkPmjbIqUu79fXIWeLUdp3_gIyuHdGcTqpesNUpulEFo_SMyHvB_216y7HI31qefiOwbmaAIcL3CezIptzpIuakHbcLrrfXy7VPPxuIfezGgKd1ugSNJ6AirFH7Ivdp6ZF5oMG1l77e-CRAsmT-4hl5oZY3_nPQssvCqpyuf_jWxd9_J4nCwQENXki-y2Vsx7VELFNzvvq_bR8UY2zdXfZ83n8qIVKZjrwwvjO2c0HyT7CFhld0Lf6zwpepXGWha45bY9ILnjjlFBVFg=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaV1ikTdPEpFp87FyQD_MD48FQvlNgyDVQDXUvIPLNrb-0-ypVK-tZ-M69d4A48PbOuCDGKTwIzcgczRJapmqblXL17wV8z8OAuIAeYWcuEnzDEha-kOPlva2a0aZ5Ezo2eYwsuM0hTMJk7hyfaE4Sf8FcCw4ACVuYsieMMGWg-yxydT-vEadx0vQh051_prBwkSd-KaAmizs1oRNbmGJSTpaSgULrypNemn1Z17KZufu6-Jbb4-4Y4SVD3ij5Bq8x7NRf5ekhfkdPMcnL39gCjtfrNWYgO4MW-MrbVekLxxHru_uVYTjtQFdf-gRkOI8TQ7z76w512Ok_FFWTiusuC8GPs3oqLOwteuLucDygWbEaouD_hRJeRca0g_71Y8DgdcgBIXUhl_9mV3XNFrMg5v31V7jNQSIbFu0UIBJDeqqKa08XhCS7Ldw9gQssw4Ms2ONISoG-8x0bwI8fYUGGn6XU5qKpYeQIvLck_tNcpkmkTnVC4XTwkYVT_4_qjRk11PZ80PcS059woV3z6FoelYH42OivNZUc6uac6Pn4hqUHc-rZJ8WII2JcYlviq7v1auHzcg0VCYp2xWOj2-EIM1EuvRHJ34lqJ6x2kwt47Q-s_pveXXV18u06P0QWAD31zkC8ZpDKCsuv0hT5ymvtqolE5xOjjrAxqQsieAlSdPO0JhvgNBnc9n36IdRAOxltLTlIseB4JcMD7ZmJk7bf_bcCdemC2GxfRki_a2IDiB6ynX2zdlASKWtP6bGwRsmhgrvs2ikHE9AqXAcP7ANH1B_2Gx9iUR9gFuMzN_vCC1qMTvWaC7e-gLJis8K1kxocH7C-AFYIlqrEksClePRtyp4qdvQ_hx8yR_Xt4zv21a3g3z6gzjIH11b4DcEhHo61AOVfEvam7f0Vp31hO_Ln966lQ=w919-h1226-s-no?authuser=0",
      "https://lh3.googleusercontent.com/pw/AJFCJaXeIwyQQynWleKmTY54GGS4PwmKSE4mRBy1DzOXDGtF5thw1OhgahMP0gMiyhuUXF_bDGjqiB5ag41tPLvf7z7r1L0jsFhZWVusCa70cWXK8NCjC0W0tC6Dzb-YdR03r2j6wCIVlC_DNgvrGbzKVpCXSs41GOXnElWNPNsjBGhQ7JPuoiwl5fK6nqSGAjfUtQCglkXoCPUQYAc6T0RsrymYBJRx3XSKy1cdMg5kY7qKB5DqbwnUD9bC89IJLFVQrIXmoj3TAv1Sgc4mOJMzgQVCx2DyfTdV0eMvC1FHmsmF575OLSbCIkc2r6K59v3424kHhPTAC1jpD4ZCjpYfawlDI-EDkYXDk8wdKQuvtxelZjfV2L5R177quaaZm3R2ViQLPmSpVgwCL5DccpS5RuqFOswORF41duwIgziZaHHOWPfukBwIGWPwlZTRhL5RZ3lHh0UM5ouxT0aw6ZNeP6mdrG8BKokMeXoL-1hZgNer2CiYfM6aYN1PcworOUNKishmLDnVYX0DMLta_mcKmpi0JB798KzlsonbMjxgYx80EMDHKqe6Qbc6P3134NZE5_wYAoesH3k05250MLVVlxOCUvD4zB-9NCu3-rhjRTOXGDTC54EPQ2sG0Nn88f8PaDM3hpmHfcKY4pAyKv8S4nZSIFWPEpRy3md_kdSyNCPjAcguqGo-xfGB6nPuzJ4KY2xIvRVH67PAhm8u5zT2t5783k_VAVsfU0iJ1FqHn1_F5jD7VlbSkPT_bVlP1_c8xXCtYgiB96g86uC31P2E8vpSOyLDFS8SrRRZrfLk4XvmpDCyhqxkj9y3xarZRhfj71vO9rlVgu74ycXG-Qix32hOREH9unZoK_bCTMvjp9bsFG3dqIV-x7EAYJzBkC-BXSEy4myUlp12RWvbPMPLfsE7rJQ=w919-h1226-s-no?authuser=0",
    ],
    noodleScore: 4.0,
    noodleDescription:
      "麵有拉麵/冬粉可以選擇，照片是拉麵，有點嚼勁，搭配牛肉湯很搭，不會吸很多湯汁，但也不會沒味道",
    beefScore: 4.2,
    beefDescription:
      "牛肉有帶筋，燉的非常軟，幾乎是入口即化的類型，有股牛肉香，個人非常喜歡，部分的肉塊是一絲一絲的，但不會很柴，裡面還是很多汁的（如圖）",
    tendonScore: 4.0,
    tendonDescription: "牛筋燉的夠軟，不會有腥味，略帶點軟Q + 入口即化",
    soupScore: 4.0,
    soupDescription: "湯頭部分，聞起來的味道很香，但喝起來的味道不算濃厚",
    overallDescription:
      "這間是「張家清真黃牛肉麵館」，隔壁是「清真黃牛肉麵館」，請注意不要搞混了！送餐速度非常快，牛肉麵小碗麵的量就很多了，CP值非常高",
    wantToVisitAgain: true,
  },
];

export default Home;

function Home() {
  const [modalOpen, toggleModalOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const columns: ColumnsType<TableDataType> = [
    {
      title: "分數",
      dataIndex: "score",
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: "店名",
      dataIndex: "storeName",
    },
    {
      title: "造訪日期",
      dataIndex: "visitDate",
      render: (val: TableDataType["visitDate"]) => val.toLocaleDateString(),
    },
    {
      title: "品項",
      dataIndex: "itemName",
    },
    {
      title: "價格",
      dataIndex: "itemPrice",
    },
    {
      title: "圖片",
      dataIndex: "images",
      render: (val: TableDataType["images"], record) => (
        <Button
          onClick={() => {
            toggleModalOpen(true);
            setSelectedImageIdx(record.key);
          }}
        >
          看圖片
        </Button>
      ),
    },
    {
      title: "麵條分數",
      dataIndex: "noodleScore",
      sorter: (a, b) => (a.noodleScore || 0) - (b.noodleScore || 0),
    },
    {
      title: "麵條描述",
      dataIndex: "noodleDescription",
    },
    {
      title: "牛肉分數",
      dataIndex: "beefScore",
      sorter: (a, b) => (a.beefScore || 0) - (b.beefScore || 0),
    },
    {
      title: "牛肉描述",
      dataIndex: "beefDescription",
    },
    {
      title: "牛筋分數",
      dataIndex: "tendonScore",
      sorter: (a, b) => (a.tendonScore || 0) - (b.tendonScore || 0),
    },
    {
      title: "牛筋描述",
      dataIndex: "tendonDescription",
    },
    {
      title: "牛肚分數",
      dataIndex: "tripeScore",
      sorter: (a, b) => (a.tripeScore || 0) - (b.tripeScore || 0),
    },
    {
      title: "牛肚描述",
      dataIndex: "tripeDescription",
    },
    {
      title: "湯頭分數",
      dataIndex: "soupScore",
      sorter: (a, b) => (a.soupScore || 0) - (b.soupScore || 0),
    },
    {
      title: "湯頭描述",
      dataIndex: "soupDescription",
    },
    {
      title: "整體描述",
      dataIndex: "overallDescription",
    },
    {
      title: "是否願意再次造訪",
      dataIndex: "wantToVisitAgain",
      render: (val: TableDataType["wantToVisitAgain"]) => (val ? "是" : "否"),
      sorter: (a, b) => (a.wantToVisitAgain ? 1 : -1),
    },
  ];
  return (
    <>
      <Header>
        <Title
          level={1}
          style={{
            color: "white",
            margin: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          牛肉麵評分系統 v0.1.0
        </Title>
      </Header>
      <Content>
        <Table
          style={{ wordBreak: "keep-all" }}
          scroll={{ x: "100%" }}
          dataSource={dataSource}
          columns={columns}
        ></Table>
        <Modal
          title="牛肉麵照片"
          open={modalOpen}
          onOk={() => toggleModalOpen(false)}
          onCancel={() => toggleModalOpen(false)}
        >
          <Carousel
            arrows
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
          >
            {dataSource[selectedImageIdx].images.map((imageURL) => (
              <div key={imageURL}>
                <img width="100%" src={imageURL} />
              </div>
            ))}
          </Carousel>
        </Modal>
      </Content>
    </>
  );
}
