(function (_0x57a25f, _0x704e65) {
  const _0x5d2450 = _0x57a25f();
  while (true) {
    try {
      const _0x12ab73 = -parseInt(a0_0x5844(0x25d)) / 0x1 + parseInt(a0_0x5844(0x22e)) / 0x2 * (-parseInt(a0_0x5844(0x350)) / 0x3) + parseInt(a0_0x5844(0x2ce)) / 0x4 + -parseInt(a0_0x5844(0x2fa)) / 0x5 * (parseInt(a0_0x5844(0x20e)) / 0x6) + parseInt(a0_0x5844(0x279)) / 0x7 * (parseInt(a0_0x5844(0x223)) / 0x8) + -parseInt(a0_0x5844(0x29d)) / 0x9 * (parseInt(a0_0x5844(0x26c)) / 0xa) + parseInt(a0_0x5844(0x25e)) / 0xb * (parseInt(a0_0x5844(0x263)) / 0xc);
      if (_0x12ab73 === _0x704e65) {
        break;
      } else {
        _0x5d2450.push(_0x5d2450.shift());
      }
    } catch (_0x259c0f) {
      _0x5d2450.push(_0x5d2450.shift());
    }
  }
})(a0_0x3a76, 0x4895f);
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require(a0_0x5844(0x1ff));
const {
  HttpsProxyAgent
} = require("https-proxy-agent");
const cfonts = require(a0_0x5844(0x34e));
const UserAgent = require("user-agents");
const crypto = require(a0_0x5844(0x374));
const {
  v4: uuidv4
} = require(a0_0x5844(0x2f2));
const cbor = require(a0_0x5844(0x2e2));
const RESET = a0_0x5844(0x21a);
const RED = a0_0x5844(0x269);
const GREEN = a0_0x5844(0x229);
const BLUE = a0_0x5844(0x244);
const WHITE = a0_0x5844(0x2f9);
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
function createSpinner(_0x25ebff) {
  const _0x3024fd = {
    "gNdHf": "Failed to fetch domains",
    "wjjTb": function (_0x207af5, _0x209a59) {
      return _0x207af5 !== _0x209a59;
    },
    "GmIbB": a0_0x5844(0x2c2),
    "RiBkR": a0_0x5844(0x303),
    "tqibW": function (_0x4e753c) {
      return _0x4e753c();
    },
    "CZpfo": function (_0x54646d, _0x22d5bf, _0x828d13) {
      return _0x54646d(_0x22d5bf, _0x828d13);
    },
    "cdnCo": function (_0x995037, _0x19c0dc) {
      return _0x995037(_0x19c0dc);
    },
    "fxuDs": a0_0x5844(0x2d8),
    "jIVJL": function (_0x540e09, _0x19a3e0) {
      return _0x540e09 === _0x19a3e0;
    },
    "MzYFw": a0_0x5844(0x308),
    "cLGIh": a0_0x5844(0x1f8),
    "PBpFf": function (_0x43274d) {
      return _0x43274d();
    },
    "GOllq": function (_0x5f23f5, _0x12eb9a) {
      return _0x5f23f5(_0x12eb9a);
    }
  };
  let _0x488403 = 0x0;
  let _0x3de255 = null;
  let _0x56ddcc = false;
  function _0x5ee382() {
    try {
      process[a0_0x5844(0x204)][a0_0x5844(0x34d)](0x0);
      process[a0_0x5844(0x204)].cursorTo(0x0);
    } catch (_0x5d5413) {}
  }
  return {
    "start"() {
      const _0x287788 = {
        "NSuoh": _0x3024fd[a0_0x5844(0x2da)],
        "PkLif": function (_0x29dd75, _0x262f38) {
          return _0x29dd75 !== _0x262f38;
        },
        "JuIff": _0x3024fd[a0_0x5844(0x293)],
        "JaFDR": _0x3024fd.RiBkR,
        "umHwE": function (_0x155444, _0x349aaa) {
          return _0x155444 % _0x349aaa;
        },
        "mNacJ": function (_0x3590d3, _0x274838) {
          return _0x3590d3 + _0x274838;
        },
        "TrgDo": function (_0x584c46) {
          return _0x3024fd[a0_0x5844(0x249)](_0x584c46);
        }
      };
      if (_0x56ddcc) {
        return;
      }
      _0x56ddcc = true;
      _0x5ee382();
      process[a0_0x5844(0x204)][a0_0x5844(0x288)]("[36m" + SPINNER_FRAMES[_0x488403] + " " + _0x25ebff + RESET);
      _0x3de255 = _0x3024fd[a0_0x5844(0x2f5)](setInterval, () => {
        const _0x4d47ea = {
          "vNkUQ": _0x287788.NSuoh
        };
        if (_0x287788[a0_0x5844(0x272)](_0x287788.JuIff, _0x287788[a0_0x5844(0x253)])) {
          _0x488403 = _0x287788[a0_0x5844(0x203)](_0x287788[a0_0x5844(0x364)](_0x488403, 0x1), SPINNER_FRAMES.length);
          _0x287788[a0_0x5844(0x327)](_0x5ee382);
          process.stdout[a0_0x5844(0x288)]("[36m" + SPINNER_FRAMES[_0x488403] + " " + _0x25ebff + RESET);
        } else {
          throw new _0x55003d(_0x4d47ea.vNkUQ);
        }
      }, 0x64);
    },
    "succeed"(_0x7b71f6) {
      const _0x2dc623 = {
        "Lsaoy": function (_0x46e8ca, _0x378ac2) {
          return _0x3024fd[a0_0x5844(0x2f1)](_0x46e8ca, _0x378ac2);
        },
        "OiLCO": _0x3024fd[a0_0x5844(0x2f7)]
      };
      if (_0x3024fd[a0_0x5844(0x37e)](_0x3024fd[a0_0x5844(0x36f)], _0x3024fd[a0_0x5844(0x233)])) {
        _0x5e3529.generateKeyPair("ec", {
          "namedCurve": _0x2dc623.OiLCO
        }, (_0xf3b48e, _0x2b52fb, _0x4fe901) => {
          if (_0xf3b48e) {
            _0x2dc623[a0_0x5844(0x2ca)](_0x58baa9, _0xf3b48e);
          } else {
            _0x2dc623[a0_0x5844(0x2ca)](_0x4185d4, {
              "publicKey": _0x2b52fb,
              "privateKey": _0x4fe901
            });
          }
        });
      } else {
        if (!_0x56ddcc) {
          return;
        }
        _0x3024fd[a0_0x5844(0x2f1)](clearInterval, _0x3de255);
        _0x56ddcc = false;
        _0x3024fd[a0_0x5844(0x333)](_0x5ee382);
        process[a0_0x5844(0x204)].write('' + GREEN + "[1m" + "✔ " + _0x7b71f6 + RESET + "\n");
      }
    },
    "fail"(_0x5649d7) {
      const _0x51b369 = a0_0x5844(0x395).split("|");
      let _0x1a013a = 0x0;
      while (true) {
        switch (_0x51b369[_0x1a013a++]) {
          case "0":
            _0x5ee382();
            continue;
          case "1":
            if (!_0x56ddcc) {
              return;
            }
            continue;
          case "2":
            process[a0_0x5844(0x204)][a0_0x5844(0x288)](RED + "✖ " + _0x5649d7 + RESET + "\n");
            continue;
          case "3":
            _0x56ddcc = false;
            continue;
          case "4":
            _0x3024fd[a0_0x5844(0x2f1)](clearInterval, _0x3de255);
            continue;
        }
        break;
      }
    },
    "stop"() {
      if (!_0x56ddcc) {
        return;
      }
      _0x3024fd[a0_0x5844(0x28a)](clearInterval, _0x3de255);
      _0x56ddcc = false;
      _0x3024fd[a0_0x5844(0x249)](_0x5ee382);
    }
  };
}
function a0_0x3a76() {
  const _0x853c04 = ["qxr0zw1WDca", "yLvmB2S", "Bg9N", "AxnqCML2yxrL", "zeLmEee", "Bwf4", "r21jyKi", "Aw5JBhvKzxm", "zMXVB3i", "Ahr0Chm6lY9HCgKUBwfPBc50Bs9Hy2nVDw50CW", "C2XptNG", "zw4TvvmSzw47Ct0WlJKSAwq7Ct0WlJG", "iKnOCM9TAxvTiJT2psiXmZqIlcaItM90oKeTqNjHBMqIo3y9iJi0iIWGiKDVB2DSzsbdAhjVBwuIo3y9iJeZnci", "qMfRt2C", "rNfZBw4", "vgLKywSGywrHihbYB3H5ihLHBMCGDgvYC2LZysb1BNr1AYbTB2rLihn0yxrPyY4", "mtu1mdDHu3LXsgG", "rMDjz1i", "CuzVz0i", "shDdsvi", "rMfPBgvKihrVigDLDcbTywLSlNrTihrVA2vUoIa", "ChjVEhLuExbL", "BvH4C2S", "r2fNywWGBwvUzgfWyxrRyw4Gsva", "qMvHCMvYia", "qvflq1i", "ihbYB3H5lG", "ugLSAwGGAMvUAxmGChjVEhK6", "DNj6qxa", "uM90yxrPBMC", "AKneEw0", "yxbWBgLJyxrPB24VANnVBIWGDgv4Dc9WBgfPBIWGkI8Q", "ueTUwvy", "tLqGrvHiqvvtva", "BuTVvKu", "qKHxBu8", "D0HRwwm", "iezHAwXLzcb0BYbNzxqGB3b0Aw9UCZOG", "rMfPBgvKihrVigzLDgnOigrVBwfPBNm", "CxnnDg4", "vvnlAgm", "uMX2u0e", "y3jLyxrLsgfZAa", "BgvUz3rO", "senRveW", "AgvHzgvYCW", "ywnJB3vUDc5QC29U", "q1Hfzgq", "zLbjt2y", "t3zxu0y", "zgLNzxn0", "DMnywK8", "yujHzwG", "ve9cEue", "BM9Uzq", "mhWZFdr8mNWX", "zKXhuKy", "Ahr0Chm6lY9KyxnOyM9HCMqUywXSC2nHBguUAw8VCgf5l3jLz2LZDgvYp2nVzgu9", "u2PYEeW", "zKXIrwe", "r2jewhm", "thnHB3K", "DhjPBq", "C1v3s28", "C2v0", "nZa4ohvkswDOqG", "yKr1t0m", "Ahr0Chm6lY9KyxnOyM9HCMqUywXSC2nHBguUAw8VyxbPl3nLy3vYzs9TAxnJl3zLCMLMEs9LBwfPBa", "Bgr4yuu", "Dg9Rzw4", "rMfPBgvKihrVigDLBMvYyxrLihrLBxaGzw1HAwWGoIa", "svaGwwfUzYbeAwD1BMfRyw46ia", "CMfUzg9T", "C2vJCMv0lwTLEq", "Dwv3vMC", "uc0Ynty", "AKvpq1K", "z05Ksgy", "BgLZDa", "C3vIC3rYAw5N", "yvPPA24", "qvLjDMe", "sgfYyxaGBwfZDwTRyw4Gyw5NA2eGEwfUzYb2ywXPzcbSzwjPAcbKyxjPidaH", "rNzbBhO", "q1PcCKy", "y2jVCG", "y2HLy2TFzw1HAwW", "ievTywLSihzLCMLMAwvKihn1y2nLC3nMDwXSEq", "v0XduLa", "seH6uuW", "ChjVEhKUDhH0", "DKfZyvi", "BLb1Duy", "ufntrw8", "iezHAwXLzcb0BYbZzw5KihzLCMLMAwnHDgLVBJOG", "yMfZzty0", "ChjVBxb0", "CgfZC3DVCMq", "CgvT", "CMvWzwf0", "y2rUq28", "DxvPza", "yxnZAwDU", "ifzLCMLMAwnHDgLVBIbLBwfPBcbZzw50ihn1y2nLC3nMDwXSEq", "q1PWzM8", "pt09ifrLBgvNCMfTienOyw5UzwWG8j+AGca6ie5uievysefvu1qGpt09", "zNH1rhm", "uNPRA04", "g1SZn20", "nuLLzhnSCa", "qMHLqNy", "tKnzv2S", "tfP3Aue", "AhPNteG", "zgvuDfK", "zxnfzwK", "zMfPBa", "rhjxvgq", "Egvfs04", "Ahr0Chm6lY9HCgKUz3vLCNjPBgXHBwfPBc5JB20VywPHEc5WAha", "t3rHAhy", "iezHAwXLzcb0BYb2zxjPzNKGzw1HAwW6ia", "qKXHz1q", "rfPoEKS", "t2PfvKW", "wxrpvLq", "Ahr0Chm6lY9KyxnOyM9HCMqUywXSC2nHBguUAw8", "reHNC0u", "igf0DgvTChrZlG", "Cg9ZDa", "wevLt1e", "cJ09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09", "y2HHBgXLBMDL", "DeTXs3a", "y2vUDgvY", "DxbKyxrL", "s2zczNa", "DxrMoa", "yxv0AerHDge", "zxHWB3j0", "BfLzsgW", "CMvMzxjYywXdB2rL", "C2XPy2u", "C2LKx3rVA2vU", "D3jPDgvvsw50mtzcrq", "cLbYB2DYzxnZoIa", "DMvYAwzdB2rL", "z3PPCcWGzgvMBgf0zsWGyNi", "ufDxsee", "id09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt0", "sgDXBxG", "DhrPq0q", "EKfIy1a", "DgLTzxn0yw1W", "vhjNrg8", "r3v6rKi", "zg9TywLU", "A0LJs1K", "DNPirwG", "rwftCKq", "C0nmsey", "C3vJy2vLza", "zNjVBq", "sM5TsvK", "DKz5qNO", "rwv5tMq", "uejWrMy", "BwfPBf9IB2r5", "y29UzMLYBq", "wLzku3O", "u0rvr2C", "Dg9ju09tDhjPBMC", "Agv4", "ufjrveu", "r2vUzxjHDgvKifrLBxaGrw1HAwWGoIa", "yLLcrei", "CMvHzezPBgvtEw5J", "zw1HAwXFywrKCG", "Cuj1Dxy", "A0Ljq3e", "r0Pqsuy", "tuzHtfa", "CK9vtfO", "ueDywwy", "4PYu77IpierHDgeGywT1BIbKAxnPBxbHBIbRzsa", "z3LQDfK", "zfjWsxm", "BfzOBwS", "wKTWEhe", "y3vYC29Yvg8", "y3LHBG", "Ahr0Chm6lY9HCgKUBwfPBc50Bs9TzxnZywDLCY8", "y2XLyxjmAw5L", "y2zVBNrZ", "iefRDw4GlI4", "nJiYndDbEgjeB2i", "ruzjt0C", "u2vYDMvYigvYCM9YoIa", "zfPMDg0", "C3rHCNq", "v2fPDgLUzW", "pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pq", "vgvYzgfWyxqG", "s3fqy2i", "vfzYtuS", "qxbHA2fOiefUzgeGAw5NAw4GBwvUz2D1BMfRyw4GChjVEhK/", "zxHPDa", "rgnxCuG", "yMXVy2S", "C3bSAxq", "twvUz2D1BMfRyw4GChjVEhK6ia", "qwvbuMW", "4PYu77IpifvZAw5NievTywLSoIa", "ie9WDgLVBNmGCMv0CMLLDMvKihn1y2nLC3nMDwXSEq", "Ahr0Chm6lY9HCgKUBwfPBc50Bs9KB21HAw5Zp3bHz2u9", "Bu5Hy0O", "y1LnruG", "zLngv2C", "zw1WDhK", "twfZDwTRyw4GANvTBgfOigfRDw46ia", "Ahr0Chm6lY9HCgKUBwfPBc50Bs90B2TLBG", "C3rHDhvZ", "tMHcuvG", "tNLOAMC", "Evr6Afi", "C3rYAw5NAwz5", "txPzrNC", "ChvIBgLJs2v5", "zNjdBum", "t3bNrei", "teLKCw0", "y3j5ChrV", "Ahr0Chm6lY9KyxnOyM9HCMqUywXSC2nHBguUAw8VCgf5", "Dw5RBM93BG", "iLDPBMrVD3mI", "rMLSzsbWCM94Es50EhqGA29ZB25Nigf0yxuGDgLKywSGzgL0zw11A2fUlcb0AwrHAYbTzw5Nz3vUywTHBIbWCM94Es4", "BwvZC2fNzq", "yxrWELu", "zM10", "r2X6uxK", "Aw5WDxq", "AKLwsKW", "y29Kzq", "Dg9tDhjPBMC", "vKznBgu", "BM5JwK8", "ExnVuK8", "y2f0y2G", "v1rNBeW", "zfD0EMy", "DKvVuw8", "D2HJsM4", "whbuuLG", "CMfUzg9TqNL0zxm", "CLHpDMW", "vuPhCLO", "zw5JB2rL", "u2nXuMG", "BwfW", "y3vIBLO", "rvDqqvm", "vwXWEMq", "q0Xuwhu", "DLqQsvvfr2D5ta", "mxW0Fdn8mhWY", "C3zhAei", "tMfkA2u", "vgvYAMfKAsbLCNjVCIbMyxrHBdOG", "DLrkyM0", "Ahr0Chm6lY9KyxnOyM9HCMqUywXSC2nHBguUAw8VyxbPl3b1yMXPyY9IDxnPBMvZC2vZl3DLyMf1DgHUl29WDgLVBNm", "4PYwieDHz2fSig1LBNLPBxbHBIbKyxrHigTLia", "BMTUuxm", "EuXdChK", "zereAxu", "q1zrsKu", "y291BNq", "C2HHmJu2", "zM9Wtgi", "BM8Ty2fJAgu", "yxHPB3m", "uxHSv3a", "lcbhywDHBdOG", "Cg1fzKu", "Dw1iD0u", "C3rKB3v0", "z2v0", "EhP5vuy", "CMvWBgfJzq", "Ahr0Chm6lY9KyxnOyM9HCMqUywXSC2nHBguUAw8VyxbPl3nLy3vYzs9TAxnJl3nLBMqVDMvYAwzPy2f0Aw9Ul21HAwW", "z0fQr2e", "vMvYAwz5Aw5NigvTywLSlI4U", "zhvUrKW", "z0TrBhm", "CKPMz2K", "mJi1nZy4nNnfs2futa", "AhLKCMe6BwvTyMvY", "rxjYB3iGC2fHDcbTzw5KyxbHDgTHBIbjudOG", "EgzUwfi", "yvHjwwi", "DurVCeK", "rwThC3q", "A1bbEhG", "C2HPzNq", "uMvNAxn0zxjPBMCGywnJB3vUDc4UlG", "EuLuEw0", "BfnZsvC", "g1SWBq", "tu5Kvue", "pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt09pt0", "BNPyr1i", "ifnLy29UzhmUlI4G", "z1LtyxC", "txnOwuK", "ywrKCMvZCW", "CgfZC3DVCMqXmJm", "nZy3mM5eAMDpvG", "tuXcvxq", "CMzurKq", "tvLMy1m", "Bvz5uhe", "D2vIyxv0Ag4Uy3jLyxrL", "g1SZmM0", "BwjLCwG", "C2fTzs1VCMLNAw4", "ENbQtuO", "Dt0XlcbP", "ndz4AhDPy00", "ue55CKm", "uhDxzMG", "sxDrsva", "Aefxvue", "y0XhswG", "qvzureK", "qwzeq20", "wMTkvwm", "z2v0x2vTywLSx2fKzhjLC3m", "uvf4suy", "u3rHDgLJ", "BwfPBf9Pza", "ugrIvLC", "rMfPBgvKihrVignYzwf0zsbLBwfPBa", "yxbWBgLJyxrPB24VANnVBG", "DeLxwgy", "C2f5", "BM93", "twvTyNvHDca", "igfRDw4GDgvSywGGzgLWCM9ZzxmUicHczxjOyxnPBdOG", "DxLREvq", "g1SZng0", "zxHPC3rZu3LUyW", "C2v0lwnVB2TPzq", "vgLjtgK", "ChjPDMf0zuTLEq", "DhfPyLC", "twfZDwTRyw4GA29KzsbYzwzLCNjHBdOG", "A2vgshq", "Bff2BMi", "zgf0yq", "CfbLq0C", "B3Pdy0q", "C3bRAq", "r2v0DgLUzYbxzwjbDxrOBIbVChrPB25ZlI4U", "Aw9szui", "sMfgrfi", "uxzzyLm", "wKDcEe4", "y29YCW", "rfLxzhu", "AhLKCMe6BMv4Da", "A2Tct04", "CMvZCg9UC2u", "tM90ztOGr3vUywTHBIbqCM94EsbvBNr1AYbnzw1PBMLTywXPC2LYierHCMKGrgv0zwTZAsbtExn0zw0", "ywXSB2m", "mZCYnZm0r1fXyKrL", "mtG2odqWodnLu3v1A0K", "tNzpCKG", "Bwf0y2G", "C3HeCKG", "wfvcAfy", "mtj6ugjnrM4", "AhrTBa", "z0PQvu0", "rNDuqLe", "r1HUD1e", "oIboBYbLBwfPBcb5zxqGlsa", "g1SZmw0", "zLHmEeu", "BwfPBhrT", "mtqXmgrmzxniEa", "wLbYz20", "tM8GDxnHyMXLigrVBwfPBNmGyxzHAwXHyMXL", "CgfYC2u", "D0Lyr0W", "z3vLCNjPBgXHBwfPBa", "ugTmAwy", "yxfOvKm", "D3bWC3K", "C21Hr3i", "twfZDwTRyw4GA29Kzsb2zxjPzMLRyxnPigrHCMKGzw1HAwW6ia", "A0H0Bfu", "EvzRC28", "ndGZrg1rtfHl", "y1HkA0C", "yvjwthO", "s3bpEgW", "whLTs0G", "zfr2tKe", "CMvMCMvZAf90B2TLBG", "AhLKCMe6DMLLDW", "CwfuD0O", "qKLIrKW", "CeDvwvm", "v3Hkwuy", "y3jLyxrL", "yxr0u3rTDa", "qwnJB3vUDca", "D3jPDgu", "l2fWAs9WDwjSAwmVyNvZAw5LC3nLCY93zwjHDxrOBI8", "r09SBhe", "ChnPr1i", "quHJu1C"];
  a0_0x3a76 = function () {
    return _0x853c04;
  };
  return a0_0x3a76();
}
function centerText(_0x2b0398) {
  const _0x1c6b49 = {
    "pGUYS": function (_0x4e0bbb, _0xb5fea7) {
      return _0x4e0bbb / _0xb5fea7;
    },
    "WLCRP": function (_0x47c9e1, _0x1ec566) {
      return _0x47c9e1 - _0x1ec566;
    }
  };
  const _0x2bd2b = process.stdout.columns || 0x50;
  const _0x5d3495 = _0x2b0398[a0_0x5844(0x207)](/\x1b\[[0-9;]*m/g, '').length;
  const _0xe7b7e7 = Math[a0_0x5844(0x292)](0x0, Math.floor(_0x1c6b49[a0_0x5844(0x283)](_0x1c6b49[a0_0x5844(0x2e5)](_0x2bd2b, _0x5d3495), 0x2)));
  return " ".repeat(_0xe7b7e7) + _0x2b0398;
}
cfonts[a0_0x5844(0x23f)](a0_0x5844(0x2ae), {
  "font": a0_0x5844(0x35d),
  "align": a0_0x5844(0x313),
  "colors": [a0_0x5844(0x34b), "black"]
});
console[a0_0x5844(0x28f)](centerText(BLUE + a0_0x5844(0x2f6) + RESET));
console.log(centerText("[36m✪ BOT AUTO REFERRAL ASP ✪" + RESET + "\n"));
function delay(_0x11ba88) {
  return new Promise(_0x47100d => setTimeout(_0x47100d, _0x11ba88));
}
async function countdown(_0x38214a, _0x53a263 = a0_0x5844(0x355)) {
  const _0x261b31 = {
    "hAWUA": function (_0x1baba8, _0x2b2fe2) {
      return _0x1baba8 / _0x2b2fe2;
    },
    "uykyT": function (_0xb0264a, _0x4067de) {
      return _0xb0264a > _0x4067de;
    },
    "AQKCR": function (_0x13ad10, _0x5706fa) {
      return _0x13ad10(_0x5706fa);
    },
    "DHgsE": function (_0xd4552, _0xa6b7ef) {
      return _0xd4552 + _0xa6b7ef;
    }
  };
  const _0x2a6070 = Math[a0_0x5844(0x295)](_0x261b31[a0_0x5844(0x232)](_0x38214a, 0x3e8));
  for (let _0x97a13e = _0x2a6070; _0x261b31[a0_0x5844(0x243)](_0x97a13e, 0x0); _0x97a13e--) {
    process[a0_0x5844(0x204)].write("[33m\r" + _0x53a263 + " " + _0x97a13e + a0_0x5844(0x21e) + RESET);
    await _0x261b31[a0_0x5844(0x2a6)](delay, 0x3e8);
  }
  process[a0_0x5844(0x204)].write(_0x261b31[a0_0x5844(0x30c)]("\r" + " "[a0_0x5844(0x2f0)](0x32), "\r"));
}
function readProxiesFromFile(_0x1416cb) {
  const _0x51d793 = {
    "oCPIw": a0_0x5844(0x316)
  };
  try {
    const _0x5025a4 = fs.readFileSync(_0x1416cb, _0x51d793.oCPIw);
    return _0x5025a4[a0_0x5844(0x35e)]("\n")[a0_0x5844(0x38f)](_0x41d7b0 => _0x41d7b0[a0_0x5844(0x2cb)]()).filter(_0x250072 => _0x250072 !== '');
  } catch (_0x118f07) {
    console[a0_0x5844(0x28f)](RED + "Gagal membaca file proxy.txt: " + _0x118f07[a0_0x5844(0x379)] + RESET);
    return [];
  }
}
function getGlobalHeaders(_0x4823fc, _0x450b5c, _0x283242 = {}) {
  const _0x296e3d = {
    "ttiCD": a0_0x5844(0x320),
    "jLcxZ": a0_0x5844(0x23d),
    "lYYHl": "https://dashboard.allscale.io",
    "JnmIY": a0_0x5844(0x1fe),
    "EeyNd": a0_0x5844(0x22d),
    "hfQPM": a0_0x5844(0x377),
    "vFyBz": a0_0x5844(0x367),
    "MLBUt": a0_0x5844(0x256),
    "SjrxL": "same-origin",
    "PRQTE": a0_0x5844(0x289),
    "QSBvT": function (_0x22e335, _0x472b8d) {
      return _0x22e335 !== _0x472b8d;
    },
    "xfnXR": a0_0x5844(0x2c1),
    "mVyPq": function (_0x516fc4, _0x508eec) {
      return _0x516fc4 / _0x508eec;
    },
    "MNdUA": a0_0x5844(0x1fc),
    "Hwhiq": "hex",
    "lSsIW": a0_0x5844(0x326),
    "HwCIR": a0_0x5844(0x2d6)
  };
  const _0x5f02f8 = new UserAgent();
  const _0x2d6829 = {
    "accept": a0_0x5844(0x2ac),
    "accept-encoding": _0x296e3d[a0_0x5844(0x324)],
    "accept-language": a0_0x5844(0x298),
    "cache-control": "no-cache",
    "content-type": _0x296e3d.jLcxZ,
    "origin": _0x296e3d[a0_0x5844(0x319)],
    "pragma": _0x296e3d[a0_0x5844(0x330)],
    "priority": _0x296e3d[a0_0x5844(0x332)],
    "referer": a0_0x5844(0x2c6) + _0x450b5c,
    "sec-ch-ua": a0_0x5844(0x299),
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": _0x296e3d.hfQPM,
    "sec-fetch-dest": _0x296e3d[a0_0x5844(0x331)],
    "sec-fetch-mode": _0x296e3d[a0_0x5844(0x224)],
    "sec-fetch-site": _0x296e3d[a0_0x5844(0x2c7)],
    "user-agent": _0x5f02f8[a0_0x5844(0x380)]()
  };
  if (_0x4823fc.includes(_0x296e3d[a0_0x5844(0x33a)])) {
    if (a0_0x5844(0x27a) !== _0x296e3d[a0_0x5844(0x211)]) {
      const _0x532e08 = Math.floor(_0x296e3d[a0_0x5844(0x227)](Date[a0_0x5844(0x240)](), 0x3e8));
      const _0x3d5c07 = crypto[a0_0x5844(0x2b7)](_0x296e3d[a0_0x5844(0x21b)]).update(a0_0x5844(0x394) + _0x532e08)[a0_0x5844(0x2bf)]("hex");
      _0x2d6829[_0x296e3d[a0_0x5844(0x219)]] = _0x532e08;
      _0x2d6829[_0x296e3d[a0_0x5844(0x2a0)]] = _0x3d5c07;
    } else {
      throw new _0x3ea704("Server error: " + _0x53cb2b.stringify(_0x1d6f77.data));
    }
  }
  Object[a0_0x5844(0x2f3)](_0x2d6829, _0x283242);
  return _0x2d6829;
}
const providers = [a0_0x5844(0x26b), "guerrillamail"];
async function getTempEmail(_0x5eee7f, _0x59da09, _0x51e4f3, _0x107e2f) {
  const _0x6337ff = {
    "HCkTL": a0_0x5844(0x362),
    "Fqsmn": a0_0x5844(0x26e),
    "gKQls": function (_0xf64acb) {
      return _0xf64acb();
    },
    "QQxIF": function (_0x214e97, _0x35e9f8) {
      return _0x214e97(_0x35e9f8);
    },
    "utIhZ": "PHPSESSID",
    "sxDrH": function (_0xe93df5, _0x2dd5d4) {
      return _0xe93df5 === _0x2dd5d4;
    },
    "bULok": a0_0x5844(0x226),
    "tIWXf": function (_0x24c8e4, _0x399557) {
      return _0x24c8e4 === _0x399557;
    },
    "rJfgi": a0_0x5844(0x26b),
    "ysoRO": function (_0x25b397, _0x3695ca) {
      return _0x25b397 !== _0x3695ca;
    },
    "frCmC": a0_0x5844(0x347),
    "BHWmO": a0_0x5844(0x2e6),
    "vrzAp": a0_0x5844(0x209),
    "keFHt": a0_0x5844(0x396),
    "BLagT": function (_0x421b5e, _0x44d58f) {
      return _0x421b5e !== _0x44d58f;
    },
    "NOtpm": a0_0x5844(0x2b3),
    "FvAlz": a0_0x5844(0x20f),
    "ZPrgm": a0_0x5844(0x280),
    "cYMEH": a0_0x5844(0x258),
    "kkBON": function (_0x109422, _0x30f5f1) {
      return _0x109422 * _0x30f5f1;
    },
    "rOULZ": a0_0x5844(0x222),
    "nzXGR": function (_0xd343c1, _0x2bb515) {
      return _0xd343c1 === _0x2bb515;
    },
    "DYWdu": a0_0x5844(0x271),
    "sUwKo": a0_0x5844(0x304),
    "uewVg": a0_0x5844(0x237),
    "VFMle": "set-cookie"
  };
  if (_0x5eee7f === _0x6337ff[a0_0x5844(0x20d)]) {
    if (_0x6337ff[a0_0x5844(0x383)](_0x6337ff[a0_0x5844(0x371)], a0_0x5844(0x347))) {
      _0x2a3100 = [];
    } else {
      try {
        if (_0x6337ff[a0_0x5844(0x383)](_0x6337ff[a0_0x5844(0x2b0)], _0x6337ff[a0_0x5844(0x2a9)])) {
          let _0x4e3324 = [];
          let _0x3975bc = 0x1;
          while (true) {
            if (a0_0x5844(0x396) !== _0x6337ff[a0_0x5844(0x24b)]) {
              _0x5ad583[a0_0x5844(0x32e)](_0x6337ff[a0_0x5844(0x2b9)]);
              return _0x5bf2f5.data[a0_0x5844(0x24d)];
            } else {
              const _0x4519bc = a0_0x5844(0x363) + _0x3975bc;
              const _0x289eb8 = await axios[a0_0x5844(0x205)](_0x4519bc);
              if (_0x6337ff[a0_0x5844(0x307)](_0x289eb8[a0_0x5844(0x36a)], 0xc8)) {
                throw new Error(_0x6337ff.NOtpm);
              }
              const _0x29304e = _0x289eb8.data;
              const _0xa29f7f = _0x29304e[_0x6337ff[a0_0x5844(0x2e0)]] || [];
              const _0x39c7b7 = _0xa29f7f.filter(_0x215604 => _0x215604.isActive && !_0x215604[a0_0x5844(0x290)]);
              _0x4e3324 = _0x4e3324.concat(_0x39c7b7);
              if (!_0x29304e[_0x6337ff.ZPrgm] || !_0x29304e[_0x6337ff[a0_0x5844(0x26d)]][_0x6337ff[a0_0x5844(0x365)]]) {
                break;
              }
              _0x3975bc++;
            }
          }
          if (_0x6337ff[a0_0x5844(0x23e)](_0x4e3324[a0_0x5844(0x2b8)], 0x0)) {
            throw new Error(_0x6337ff.Fqsmn);
          }
          const _0x1195bf = _0x4e3324[Math[a0_0x5844(0x295)](_0x6337ff[a0_0x5844(0x259)](Math[a0_0x5844(0x2d5)](), _0x4e3324[a0_0x5844(0x2b8)]))];
          const _0x1322b8 = _0x1195bf[a0_0x5844(0x329)];
          const _0x1c2e61 = Math[a0_0x5844(0x2d5)]()[a0_0x5844(0x380)](0x24)[a0_0x5844(0x2dc)](0x2, 0xf);
          const _0x175362 = _0x1c2e61 + "@" + _0x1322b8;
          const _0xe9ba44 = _0x6337ff[a0_0x5844(0x343)];
          const _0x38b5d0 = a0_0x5844(0x296);
          const _0x58bd71 = {
            "address": _0x175362,
            "password": _0xe9ba44
          };
          const _0x1fe2d9 = await axios[a0_0x5844(0x30e)](_0x38b5d0, _0x58bd71);
          if (_0x6337ff[a0_0x5844(0x21d)](_0x1fe2d9[a0_0x5844(0x36a)], 0xc9)) {
            console.log(GREEN + "Generated Temp Email : " + _0x175362 + RESET);
            return {
              "provider": _0x6337ff[a0_0x5844(0x20d)],
              "address": _0x175362,
              "password": _0xe9ba44,
              "login": _0x1c2e61,
              "domain": _0x1322b8
            };
          } else {
            throw new Error(a0_0x5844(0x23c));
          }
        } else {
          throw new _0x4df983(_0x6337ff[a0_0x5844(0x29b)]);
        }
      } catch (_0x805037) {
        console[a0_0x5844(0x28f)](RED + a0_0x5844(0x2d3) + _0x805037.message + RESET);
        return null;
      }
    }
  } else {
    if (_0x5eee7f === _0x6337ff[a0_0x5844(0x257)]) {
      const _0x22f9ec = _0x6337ff[a0_0x5844(0x2cc)];
      const _0x40a94b = {
        "f": _0x6337ff[a0_0x5844(0x2d7)],
        "lang": "en",
        "ip": _0x51e4f3,
        "agent": _0x107e2f
      };
      try {
        const _0x4f660f = await _0x59da09[a0_0x5844(0x205)](_0x22f9ec, {
          "params": _0x40a94b
        });
        const _0x4eefab = _0x4f660f[a0_0x5844(0x24d)];
        const _0x4646d7 = _0x4eefab[a0_0x5844(0x33e)];
        const _0x42542b = _0x4eefab[a0_0x5844(0x31c)] || '';
        let _0x385223 = '';
        if (_0x4f660f[a0_0x5844(0x2ba)]["set-cookie"]) {
          _0x4f660f[a0_0x5844(0x2ba)][_0x6337ff[a0_0x5844(0x381)]].forEach(_0x33a61f => {
            if (_0x33a61f[a0_0x5844(0x294)]("PHPSESSID")) {
              if (_0x6337ff[a0_0x5844(0x261)](_0x6337ff[a0_0x5844(0x28e)], "vBlfp")) {
                const _0x2c665a = a0_0x5844(0x2c4)[a0_0x5844(0x35e)]("|");
                let _0x5e027f = 0x0;
                while (true) {
                  switch (_0x2c665a[_0x5e027f++]) {
                    case "0":
                      if (!_0x169d96) {
                        return;
                      }
                      continue;
                    case "1":
                      _0xb7a5f7[a0_0x5844(0x204)][a0_0x5844(0x288)](_0x12fbae + "✖ " + _0xeea8d5 + _0x56ae53 + "\n");
                      continue;
                    case "2":
                      _0x6337ff[a0_0x5844(0x20c)](_0x587350);
                      continue;
                    case "3":
                      _0x6337ff[a0_0x5844(0x238)](_0x861645, _0x4c9c6f);
                      continue;
                    case "4":
                      _0xa08247 = false;
                      continue;
                  }
                  break;
                }
              } else {
                _0x385223 = _0x33a61f.split(";")[0x0].split("=")[0x1];
              }
            }
          });
        }
        console[a0_0x5844(0x28f)](GREEN + a0_0x5844(0x33b) + _0x4646d7 + RESET);
        return {
          "provider": a0_0x5844(0x271),
          "address": _0x4646d7,
          "sid_token": _0x42542b,
          "phpsessid": _0x385223
        };
      } catch (_0x232563) {
        console[a0_0x5844(0x28f)](RED + a0_0x5844(0x2d3) + _0x232563[a0_0x5844(0x379)] + RESET);
        return null;
      }
    }
  }
  return null;
}
async function getMailTmToken(_0x4cc2fa, _0x55be2c, _0x4bd5c2) {
  const _0x342426 = {
    "BBNls": "PHPSESSID",
    "cXfiB": a0_0x5844(0x369),
    "WxJYF": function (_0x298b4e, _0x354261) {
      return _0x298b4e === _0x354261;
    },
    "nncZO": a0_0x5844(0x2c5)
  };
  const _0x498e2c = _0x342426.cXfiB;
  const _0x2f6303 = {
    "address": _0x55be2c,
    "password": _0x4bd5c2
  };
  try {
    if (_0x342426[a0_0x5844(0x284)](a0_0x5844(0x218), _0x342426[a0_0x5844(0x382)])) {
      const _0x164919 = {
        "LZwiA": "PHPSESSID"
      };
      _0x3d059b.headers[a0_0x5844(0x246)].forEach(_0x405b54 => {
        if (_0x405b54[a0_0x5844(0x294)](_0x164919[a0_0x5844(0x2fd)])) {
          _0x8ef7f1 = _0x405b54[a0_0x5844(0x35e)](";")[0x0][a0_0x5844(0x35e)]("=")[0x1];
        }
      });
    } else {
      const _0x632571 = await axios.post(_0x498e2c, _0x2f6303);
      return _0x632571[a0_0x5844(0x24d)][a0_0x5844(0x2d2)];
    }
  } catch (_0x318e54) {
    console[a0_0x5844(0x28f)](RED + a0_0x5844(0x2a1) + _0x318e54[a0_0x5844(0x379)] + RESET);
    return null;
  }
}
async function checkInbox(_0x441761, _0x19a09c, _0x46ea54, _0x2f418a = 0xf, _0x20c83f = 0x1f40) {
  const _0x34c597 = {
    "efxET": function (_0x22f009, _0x58023e) {
      return _0x22f009 === _0x58023e;
    },
    "svwfS": a0_0x5844(0x2aa),
    "OjEVL": "timestamp",
    "bYBDB": "secret-key",
    "Hgqmx": function (_0x325b40, _0x1b65b2) {
      return _0x325b40 === _0x1b65b2;
    },
    "vAsaR": a0_0x5844(0x26b),
    "yVkso": function (_0x3d20c8, _0x47e469, _0x7cd439, _0x3b0ecf) {
      return _0x3d20c8(_0x47e469, _0x7cd439, _0x3b0ecf);
    },
    "rfTFD": function (_0x1c98f1, _0x1fe8d3) {
      return _0x1c98f1 <= _0x1fe8d3;
    },
    "BakOg": a0_0x5844(0x213),
    "dILxA": a0_0x5844(0x305),
    "ZwNAL": "https://api.mail.tm/messages",
    "iUUhZ": a0_0x5844(0x2d1),
    "KfBfp": a0_0x5844(0x373),
    "kIICq": function (_0xf4dba7, _0x11176c) {
      return _0xf4dba7 > _0x11176c;
    },
    "GlzQy": function (_0x14f6be, _0x440b23) {
      return _0x14f6be !== _0x440b23;
    },
    "ZVJSz": a0_0x5844(0x366),
    "PwWfh": a0_0x5844(0x348),
    "jCDym": a0_0x5844(0x271),
    "hVpKt": a0_0x5844(0x2e3),
    "nknQs": function (_0x121a3b, _0x3253e4) {
      return _0x121a3b !== _0x3253e4;
    },
    "rXOvl": a0_0x5844(0x270),
    "mXxsk": a0_0x5844(0x220),
    "USKhc": "fetch_email",
    "nPuuF": function (_0x56ad85, _0x89364f) {
      return _0x56ad85(_0x89364f);
    }
  };
  if (_0x34c597[a0_0x5844(0x323)](_0x441761, _0x34c597[a0_0x5844(0x2e8)])) {
    const _0xe02dc4 = await _0x34c597[a0_0x5844(0x278)](getMailTmToken, _0x19a09c, _0x46ea54[a0_0x5844(0x221)], _0x46ea54[a0_0x5844(0x2ee)]);
    if (!_0xe02dc4) {
      return null;
    }
    for (let _0x3a0fc8 = 0x1; _0x34c597[a0_0x5844(0x225)](_0x3a0fc8, _0x2f418a); _0x3a0fc8++) {
      if (_0x34c597[a0_0x5844(0x29a)] === _0x34c597[a0_0x5844(0x291)]) {
        throw new _0x2ba2c3(a0_0x5844(0x352) + _0x12318[a0_0x5844(0x36e)](_0x4e92a5[a0_0x5844(0x24d)]));
      } else {
        try {
          if (_0x34c597.iUUhZ !== _0x34c597[a0_0x5844(0x315)]) {
            const _0x145df5 = await axios.get("https://api.mail.tm/messages", {
              "headers": {
                "Authorization": a0_0x5844(0x2a5) + _0xe02dc4
              }
            });
            const _0x34289d = _0x145df5.data[a0_0x5844(0x20f)];
            if (_0x34289d.length > 0x0) {
              if (_0x34c597[a0_0x5844(0x37c)](_0x34c597[a0_0x5844(0x336)], _0x34c597[a0_0x5844(0x336)])) {
                _0x790540[a0_0x5844(0x28f)](_0x38e53d + a0_0x5844(0x28d) + _0x8bff3b + a0_0x5844(0x268) + _0x568e34.message + _0x364a13);
              } else {
                const _0x5a7454 = _0x34289d[0x0].id;
                const _0x281dc9 = a0_0x5844(0x34c) + _0x5a7454;
                const _0x3a0049 = await axios.get(_0x281dc9, {
                  "headers": {
                    "Authorization": a0_0x5844(0x2a5) + _0xe02dc4
                  }
                });
                const _0x1cce0b = _0x3a0049[a0_0x5844(0x24d)].text || _0x3a0049[a0_0x5844(0x24d)][a0_0x5844(0x264)];
                const _0x1b6d4f = _0x1cce0b.match(/verification code is (\d{6})/);
                if (_0x1b6d4f) {
                  return _0x34c597[a0_0x5844(0x230)] !== _0x34c597[a0_0x5844(0x230)] ? (_0x3e695c.log(_0xfb2aa3 + "Failed to generate temp email : " + _0x3876d3[a0_0x5844(0x379)] + _0x26ce53), null) : _0x1b6d4f[0x1];
                }
              }
            }
          } else {
            _0x4bde6d = _0x15e0d1[a0_0x5844(0x35e)](";")[0x0][a0_0x5844(0x35e)]("=")[0x1];
          }
        } catch (_0x2c565a) {
          console.log("[33m" + a0_0x5844(0x28d) + _0x3a0fc8 + ": No email yet - " + _0x2c565a[a0_0x5844(0x379)] + RESET);
        }
        await delay(_0x20c83f);
      }
    }
    console[a0_0x5844(0x28f)](RED + "No verification email received after " + _0x2f418a + a0_0x5844(0x30d) + RESET);
    return null;
  } else {
    if (_0x441761 === _0x34c597[a0_0x5844(0x2ab)]) {
      const _0x23d9e8 = _0x46ea54.phpsessid;
      const _0x291430 = {
        "Cookie": "PHPSESSID=" + _0x23d9e8
      };
      for (let _0x13a549 = 0x1; _0x34c597[a0_0x5844(0x225)](_0x13a549, _0x2f418a); _0x13a549++) {
        const _0x2062f4 = {
          "f": _0x34c597.hVpKt,
          "seq": 0x0
        };
        try {
          if (_0x34c597[a0_0x5844(0x1f7)](a0_0x5844(0x270), _0x34c597[a0_0x5844(0x38b)])) {
            if (_0x33c482 === _0x34c597.svwfS) {
              _0x189b7a = _0x1fa9d6[_0x110e4c.floor(_0x574549.random() * _0x599976[a0_0x5844(0x2b8)])];
            } else {
              _0x1d263a = _0x4590f4[a0_0x5844(0x216)]();
            }
            if (!_0x4f9e2d) {
              _0x2fe1c3.log(_0x1a7a87 + "Tidak ada proxy yang tersisa untuk mode static." + _0x18acfd);
              _0x47d314.exit(0x1);
            }
            _0x210483[a0_0x5844(0x28f)](_0x5be0cf + "Menggunakan proxy: " + _0x46a0a8 + _0x4c7d1b);
            const _0x2016aa = new _0x595a5e(_0x24c562);
            _0x236ea5 = _0x2065e9[a0_0x5844(0x285)]({
              "httpAgent": _0x2016aa,
              "httpsAgent": _0x2016aa
            });
          } else {
            const _0x2446cd = await _0x19a09c.get("https://api.guerrillamail.com/ajax.php", {
              "params": _0x2062f4,
              "headers": _0x291430
            });
            const _0x132e54 = _0x2446cd[a0_0x5844(0x24d)][a0_0x5844(0x2db)] || [];
            if (_0x34c597[a0_0x5844(0x340)](_0x132e54[a0_0x5844(0x2b8)], 0x0)) {
              if (_0x34c597[a0_0x5844(0x323)](_0x34c597[a0_0x5844(0x2a3)], a0_0x5844(0x2fe))) {
                const _0x1860f7 = _0x4645e8.floor(_0x43a9bd[a0_0x5844(0x240)]() / 0x3e8);
                const _0xacede1 = _0x55e5b6[a0_0x5844(0x2b7)](a0_0x5844(0x1fc))[a0_0x5844(0x314)]("vT*IUEGgyL" + _0x1860f7)[a0_0x5844(0x2bf)](a0_0x5844(0x339));
                _0x5c136c[_0x34c597[a0_0x5844(0x309)]] = _0x1860f7;
                _0x3dac43[_0x34c597[a0_0x5844(0x33c)]] = _0xacede1;
              } else {
                const _0x3834eb = _0x132e54[0x0];
                const _0x52f7b6 = {
                  "f": _0x34c597[a0_0x5844(0x2b5)],
                  "email_id": _0x3834eb[a0_0x5844(0x23a)]
                };
                const _0x62705c = await _0x19a09c[a0_0x5844(0x205)]("https://api.guerrillamail.com/ajax.php", {
                  "params": _0x52f7b6,
                  "headers": _0x291430
                });
                const _0x59091b = _0x62705c[a0_0x5844(0x24d)][a0_0x5844(0x334)] || '';
                const _0x4b79e6 = _0x59091b[a0_0x5844(0x260)](/verification code is (\d{6})/);
                if (_0x4b79e6) {
                  return _0x4b79e6[0x1];
                }
              }
            }
          }
        } catch (_0x5b86d5) {
          console.log("[33m" + a0_0x5844(0x28d) + _0x13a549 + a0_0x5844(0x268) + _0x5b86d5[a0_0x5844(0x379)] + RESET);
        }
        await _0x34c597[a0_0x5844(0x2e9)](delay, _0x20c83f);
      }
      console[a0_0x5844(0x28f)](RED + "No verification email received after " + _0x2f418a + a0_0x5844(0x30d) + RESET);
      return null;
    }
  }
  return null;
}
async function sendVerification(_0x532468, _0xc2a728, _0x1c28ad) {
  const _0x4f1bb4 = {
    "Nyhjg": a0_0x5844(0x208),
    "kIcKY": a0_0x5844(0x375),
    "jEOCY": "Sending verification email...",
    "XUBhV": function (_0x324000, _0x2f0ae7) {
      return _0x324000 === _0x2f0ae7;
    },
    "GnHQX": a0_0x5844(0x2f4)
  };
  const _0x424411 = _0x4f1bb4[a0_0x5844(0x36c)];
  const _0x2a6344 = {
    "email": _0xc2a728
  };
  const _0x1957f7 = {
    ...getGlobalHeaders(_0x424411, ''),
    "authorization": a0_0x5844(0x2a5) + _0x1c28ad,
    "referer": _0x4f1bb4[a0_0x5844(0x32a)]
  };
  const _0x10af9a = createSpinner(_0x4f1bb4[a0_0x5844(0x2d9)]);
  _0x10af9a.start();
  try {
    const _0x1b588d = await _0x532468.post(_0x424411, _0x2a6344, {
      "headers": _0x1957f7
    });
    if (_0x4f1bb4[a0_0x5844(0x262)](_0x1b588d.data[a0_0x5844(0x37f)], 0x0)) {
      _0x10af9a[a0_0x5844(0x32e)](_0x4f1bb4.GnHQX);
      return true;
    } else {
      throw new Error(a0_0x5844(0x352) + JSON[a0_0x5844(0x36e)](_0x1b588d[a0_0x5844(0x24d)]));
    }
  } catch (_0xe54422) {
    const _0x3c26ee = _0xe54422.response ? JSON[a0_0x5844(0x36e)](_0xe54422.response.data) : _0xe54422[a0_0x5844(0x379)];
    _0x10af9a.fail(a0_0x5844(0x2eb) + _0x3c26ee);
    return false;
  }
}
async function verifyEmail(_0x1feb8e, _0xf81a94, _0x22c987, _0x2417e0) {
  const _0x2e7893 = {
    "GieUc": a0_0x5844(0x316),
    "tKqKp": function (_0x15e27e, _0x54a6af, _0xe039c8) {
      return _0x15e27e(_0x54a6af, _0xe039c8);
    },
    "dDDiu": a0_0x5844(0x375),
    "trlRd": a0_0x5844(0x20a),
    "YtOVT": function (_0x27b374, _0x12a199) {
      return _0x27b374 !== _0x12a199;
    },
    "KqPcb": "MRCsh",
    "KpOxl": a0_0x5844(0x390),
    "fPIOf": function (_0x21b9e1, _0x39f3bb) {
      return _0x21b9e1 === _0x39f3bb;
    },
    "AYIva": a0_0x5844(0x2e4),
    "AfDCm": function (_0x1593e3, _0x3ba170) {
      return _0x1593e3 !== _0x3ba170;
    },
    "xpdUy": "iEPEV",
    "HhNEW": a0_0x5844(0x281),
    "RlvSA": a0_0x5844(0x300),
    "XymKH": a0_0x5844(0x2f8)
  };
  const _0x5abd14 = a0_0x5844(0x2d0);
  const _0x130d31 = {
    "email": _0xf81a94,
    "code": _0x22c987
  };
  const _0x41ef2f = {
    ..._0x2e7893[a0_0x5844(0x312)](getGlobalHeaders, _0x5abd14, ''),
    "authorization": a0_0x5844(0x2a5) + _0x2417e0,
    "referer": _0x2e7893[a0_0x5844(0x1f9)]
  };
  const _0x250f48 = createSpinner(_0x2e7893.trlRd);
  _0x250f48[a0_0x5844(0x354)]();
  try {
    if (_0x2e7893[a0_0x5844(0x30a)](_0x2e7893[a0_0x5844(0x358)], _0x2e7893[a0_0x5844(0x27c)])) {
      const _0x4596e8 = await _0x1feb8e[a0_0x5844(0x30e)](_0x5abd14, _0x130d31, {
        "headers": _0x41ef2f
      });
      if (_0x2e7893[a0_0x5844(0x2bd)](_0x4596e8[a0_0x5844(0x24d)][a0_0x5844(0x37f)], 0x0)) {
        _0x250f48[a0_0x5844(0x32e)](_0x2e7893[a0_0x5844(0x2de)]);
        return true;
      } else {
        if (_0x2e7893[a0_0x5844(0x235)]("iEPEV", _0x2e7893.HhNEW)) {
          throw new Error(a0_0x5844(0x352) + JSON[a0_0x5844(0x36e)](_0x4596e8[a0_0x5844(0x24d)]));
        } else {
          _0x32344a[a0_0x5844(0x28f)](_0x1f88f2 + a0_0x5844(0x2a1) + _0x29d0f2[a0_0x5844(0x379)] + _0x2e16e8);
          return null;
        }
      }
    } else {
      try {
        _0x6d53fe[a0_0x5844(0x204)][a0_0x5844(0x34d)](0x0);
        _0x3b01f0.stdout[a0_0x5844(0x34a)](0x0);
      } catch (_0x5e23ae) {}
    }
  } catch (_0x2ae7a1) {
    if (_0x2e7893[a0_0x5844(0x2bd)](_0x2e7893[a0_0x5844(0x2b6)], _0x2e7893[a0_0x5844(0x27d)])) {
      const _0x459534 = _0x160576[a0_0x5844(0x33d)](_0x1afdd4, _0x2e7893.GieUc);
      return _0x459534[a0_0x5844(0x35e)]("\n").map(_0x31b99e => _0x31b99e[a0_0x5844(0x2cb)]()).filter(_0x29590f => _0x29590f !== '');
    } else {
      const _0x3d07c0 = _0x2ae7a1[a0_0x5844(0x25a)] ? JSON[a0_0x5844(0x36e)](_0x2ae7a1[a0_0x5844(0x25a)].data) : _0x2ae7a1.message;
      _0x250f48[a0_0x5844(0x301)](a0_0x5844(0x306) + _0x3d07c0);
      return false;
    }
  }
}
async function getOptions(_0x4754cc, _0x2e5bf0, _0x1ec8f7) {
  const _0x2ddb6d = {
    "PSSEo": a0_0x5844(0x1f5),
    "YCrZq": a0_0x5844(0x251),
    "CbahG": function (_0x166721, _0x5d9725, _0x55f1d3) {
      return _0x166721(_0x5d9725, _0x55f1d3);
    },
    "GXnwQ": a0_0x5844(0x362)
  };
  const _0x526d35 = _0x2ddb6d[a0_0x5844(0x2ea)];
  const _0x37071d = {
    "email": _0x2e5bf0,
    "type": 0x0
  };
  const _0xf1651b = createSpinner(_0x2ddb6d.YCrZq);
  _0xf1651b[a0_0x5844(0x354)]();
  try {
    const _0x2fc23e = await _0x4754cc[a0_0x5844(0x30e)](_0x526d35, _0x37071d, {
      "headers": getGlobalHeaders(_0x526d35, _0x1ec8f7)
    });
    if (_0x2fc23e[a0_0x5844(0x24d)].code === 0x0) {
      _0xf1651b[a0_0x5844(0x32e)](_0x2ddb6d[a0_0x5844(0x267)]);
      return _0x2fc23e[a0_0x5844(0x24d)].data;
    } else {
      throw new Error(a0_0x5844(0x352) + JSON[a0_0x5844(0x36e)](_0x2fc23e.data));
    }
  } catch (_0x4f3c34) {
    const _0x485bb5 = _0x4f3c34[a0_0x5844(0x25a)] ? JSON.stringify(_0x4f3c34[a0_0x5844(0x25a)].data) : _0x4f3c34[a0_0x5844(0x379)];
    _0xf1651b[a0_0x5844(0x301)](a0_0x5844(0x2b2) + _0x485bb5);
    return null;
  }
}
function a0_0x5844(_0x5b51b6, _0x210b02) {
  _0x5b51b6 = _0x5b51b6 - 0x1f4;
  const _0x3a76b3 = a0_0x3a76();
  let _0x584430 = _0x3a76b3[_0x5b51b6];
  if (a0_0x5844.fgNWxn === undefined) {
    var _0x366a9d = function (_0x476125) {
      let _0x4bed42 = '';
      let _0x3a505c = '';
      let _0x59a4a0 = 0x0;
      let _0xdb603b;
      let _0x6d53fe;
      for (let _0x3b01f0 = 0x0; _0x6d53fe = _0x476125.charAt(_0x3b01f0++); ~_0x6d53fe && (_0xdb603b = _0x59a4a0 % 0x4 ? _0xdb603b * 0x40 + _0x6d53fe : _0x6d53fe, _0x59a4a0++ % 0x4) ? _0x4bed42 += String.fromCharCode(0xff & _0xdb603b >> (-0x2 * _0x59a4a0 & 0x6)) : 0x0) {
        _0x6d53fe = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(_0x6d53fe);
      }
      let _0x38def7 = 0x0;
      for (let _0x5b04c4 = _0x4bed42.length; _0x38def7 < _0x5b04c4; _0x38def7++) {
        _0x3a505c += "%" + ("00" + _0x4bed42.charCodeAt(_0x38def7).toString(0x10)).slice(-0x2);
      }
      return decodeURIComponent(_0x3a505c);
    };
    a0_0x5844.bfIlqx = _0x366a9d;
    a0_0x5844.YvXXyN = {};
    a0_0x5844.fgNWxn = true;
  }
  const _0x175287 = _0x3a76b3[0x0];
  const _0x31f22a = _0x5b51b6 + _0x175287;
  const _0x630809 = a0_0x5844.YvXXyN[_0x31f22a];
  if (!_0x630809) {
    _0x584430 = a0_0x5844.bfIlqx(_0x584430);
    a0_0x5844.YvXXyN[_0x31f22a] = _0x584430;
  } else {
    _0x584430 = _0x630809;
  }
  return _0x584430;
}
async function getIpAddress(_0x32f61d) {
  const _0x3846d2 = {
    "yTzhR": a0_0x5844(0x376),
    "NAVUP": "https://api.ipify.org/?format=json",
    "sCLHF": function (_0x4b7fb1, _0x43cf20) {
      return _0x4b7fb1 !== _0x43cf20;
    },
    "EkGst": a0_0x5844(0x277),
    "drZEB": a0_0x5844(0x266),
    "ZKpxq": function (_0x1c8998, _0x2edae6) {
      return _0x1c8998 !== _0x2edae6;
    },
    "EWPAS": a0_0x5844(0x22a)
  };
  try {
    if (_0x3846d2[a0_0x5844(0x32d)](_0x3846d2[a0_0x5844(0x214)], _0x3846d2.drZEB)) {
      const _0xf38b2 = await _0x32f61d[a0_0x5844(0x205)]("https://api.ipify.org/?format=json");
      return _0xf38b2[a0_0x5844(0x24d)].ip;
    } else {
      throw new _0x4238ef(a0_0x5844(0x352) + _0x4b0d3b.stringify(_0x2754de.data));
    }
  } catch (_0x6febf7) {
    return _0x3846d2[a0_0x5844(0x349)](_0x3846d2.EWPAS, _0x3846d2[a0_0x5844(0x391)]) ? (_0x3e5c26[a0_0x5844(0x28f)](_0xe00509 + "Failed to get IP: " + _0x58295d.message + _0x108048), _0x3846d2[a0_0x5844(0x36d)]) : (console.log(RED + "Failed to get IP: " + _0x6febf7.message + RESET), _0x3846d2[a0_0x5844(0x36d)]);
  }
}
async function generateCredential(_0x3fa416) {
  const _0x55049a = {
    "QxlWp": function (_0x2130ca, _0x4ebc4b) {
      return _0x2130ca === _0x4ebc4b;
    },
    "fLbEa": a0_0x5844(0x2c9),
    "qBuuv": "gLBuf",
    "zpjMJ": function (_0xb177b7, _0x4c2845) {
      return _0xb177b7(_0x4c2845);
    },
    "mKoVE": function (_0x5cfa1d, _0x132002) {
      return _0x5cfa1d(_0x132002);
    },
    "xzyUF": a0_0x5844(0x320),
    "hzmEm": "en-US,en;q=0.9,id;q=0.8",
    "CVQJE": a0_0x5844(0x1fe),
    "AVTDI": a0_0x5844(0x23d),
    "AeARl": a0_0x5844(0x22d),
    "OpgDB": a0_0x5844(0x299),
    "CXEdd": a0_0x5844(0x256),
    "aqhVC": a0_0x5844(0x289),
    "DrWTd": function (_0x522a84, _0x51d0bd) {
      return _0x522a84 / _0x51d0bd;
    },
    "PWWHA": a0_0x5844(0x339),
    "QgjKi": a0_0x5844(0x326),
    "IRSEm": a0_0x5844(0x2d6),
    "pUIoX": function (_0x63b13e, _0x235a34) {
      return _0x63b13e !== _0x235a34;
    },
    "gYSaw": a0_0x5844(0x388),
    "AHcSW": "P-256",
    "zAbcP": a0_0x5844(0x228),
    "deTtY": a0_0x5844(0x2ec),
    "SDUGg": "pkcs8",
    "KJjNq": "pem",
    "dWtzf": a0_0x5844(0x250),
    "OvWSF": "der",
    "ioReB": a0_0x5844(0x2c3),
    "MFGRF": a0_0x5844(0x317)
  };
  const _0x30ddc3 = _0x3fa416[a0_0x5844(0x311)];
  const _0x55e551 = _0x3fa416.rp.id;
  const _0x1de3a2 = a0_0x5844(0x30b);
  const _0x8b498e = {
    "type": _0x55049a[a0_0x5844(0x325)],
    "challenge": _0x30ddc3,
    "origin": _0x1de3a2,
    "crossOrigin": false
  };
  const _0x11ac92 = Buffer[a0_0x5844(0x32f)](JSON[a0_0x5844(0x36e)](_0x8b498e));
  const _0x255b86 = _0x11ac92.toString(_0x55049a.deTtY);
  const _0x3e4da4 = await new Promise((_0x3c2922, _0x45c6a4) => {
    const _0x6cc6e7 = {
      "PNyrC": _0x55049a[a0_0x5844(0x206)],
      "bgCkB": "en-US,en;q=0.9,id;q=0.8",
      "EFIOG": _0x55049a[a0_0x5844(0x1fa)],
      "ROciC": _0x55049a[a0_0x5844(0x234)],
      "GuzFB": _0x55049a[a0_0x5844(0x360)],
      "BheBv": _0x55049a[a0_0x5844(0x372)],
      "vEoQo": a0_0x5844(0x377),
      "NhBQX": _0x55049a[a0_0x5844(0x2bc)],
      "WTglL": _0x55049a[a0_0x5844(0x273)],
      "wfOYi": function (_0x344d0d, _0xa8903a) {
        return _0x55049a[a0_0x5844(0x302)](_0x344d0d, _0xa8903a);
      },
      "UJGrZ": a0_0x5844(0x1fc),
      "QvYbS": _0x55049a[a0_0x5844(0x321)],
      "CZBrF": _0x55049a.QgjKi,
      "atpzU": _0x55049a.IRSEm
    };
    if (_0x55049a[a0_0x5844(0x21f)] !== _0x55049a[a0_0x5844(0x21f)]) {
      const _0x15ebc4 = new _0x1a0e3f();
      const _0x54f9d3 = {
        "accept": a0_0x5844(0x2ac),
        "accept-encoding": _0x6cc6e7[a0_0x5844(0x22f)],
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "cache-control": _0x6cc6e7[a0_0x5844(0x351)],
        "content-type": _0x6cc6e7.ROciC,
        "origin": a0_0x5844(0x30b),
        "pragma": _0x6cc6e7[a0_0x5844(0x351)],
        "priority": _0x6cc6e7[a0_0x5844(0x328)],
        "referer": a0_0x5844(0x2c6) + _0x1d3143,
        "sec-ch-ua": _0x6cc6e7[a0_0x5844(0x2fb)],
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": _0x6cc6e7[a0_0x5844(0x387)],
        "sec-fetch-dest": a0_0x5844(0x367),
        "sec-fetch-mode": _0x6cc6e7[a0_0x5844(0x36b)],
        "sec-fetch-site": a0_0x5844(0x22b),
        "user-agent": _0x15ebc4[a0_0x5844(0x380)]()
      };
      if (_0x5bbbd1.includes(_0x6cc6e7[a0_0x5844(0x385)])) {
        const _0x2dea1b = _0xcc54fe[a0_0x5844(0x295)](_0x55049a[a0_0x5844(0x302)](_0x4de604.now(), 0x3e8));
        const _0x1f65c6 = _0x4d7907[a0_0x5844(0x2b7)](_0x6cc6e7[a0_0x5844(0x38c)])[a0_0x5844(0x314)](a0_0x5844(0x394) + _0x2dea1b)[a0_0x5844(0x2bf)](_0x6cc6e7[a0_0x5844(0x254)]);
        _0x54f9d3[_0x6cc6e7[a0_0x5844(0x2e1)]] = _0x2dea1b;
        _0x54f9d3[_0x6cc6e7[a0_0x5844(0x37a)]] = _0x1f65c6;
      }
      _0x17ce70[a0_0x5844(0x2f3)](_0x54f9d3, _0x57babd);
      return _0x54f9d3;
    } else {
      crypto.generateKeyPair("ec", {
        "namedCurve": _0x55049a[a0_0x5844(0x28c)]
      }, (_0x1de71d, _0x462705, _0x20b08a) => {
        if (_0x55049a[a0_0x5844(0x200)](_0x55049a[a0_0x5844(0x2c8)], _0x55049a[a0_0x5844(0x33f)])) {
          const _0x3d4fe6 = _0x200a2e[a0_0x5844(0x25a)] ? _0x5f1ea8[a0_0x5844(0x36e)](_0x48ce80.response[a0_0x5844(0x24d)]) : _0x53d230[a0_0x5844(0x379)];
          _0x101741[a0_0x5844(0x301)](a0_0x5844(0x306) + _0x3d4fe6);
          return false;
        } else {
          if (_0x1de71d) {
            _0x55049a[a0_0x5844(0x22c)](_0x45c6a4, _0x1de71d);
          } else {
            _0x55049a[a0_0x5844(0x2af)](_0x3c2922, {
              "publicKey": _0x462705,
              "privateKey": _0x20b08a
            });
          }
        }
      });
    }
  });
  const _0x4bb025 = _0x3e4da4[a0_0x5844(0x370)][a0_0x5844(0x318)]({
    "type": _0x55049a[a0_0x5844(0x386)],
    "format": _0x55049a[a0_0x5844(0x2be)]
  });
  const _0x34655d = _0x4bb025[a0_0x5844(0x31b)](0x1a);
  const _0x37f71d = _0x34655d.slice(0x1, 0x21);
  const _0x3c53c4 = _0x34655d.slice(0x21);
  const _0x2ec641 = new Map();
  _0x2ec641[a0_0x5844(0x2cd)](0x1, 0x2);
  _0x2ec641[a0_0x5844(0x2cd)](0x3, -0x7);
  _0x2ec641[a0_0x5844(0x2cd)](-0x1, 0x1);
  _0x2ec641[a0_0x5844(0x2cd)](-0x2, _0x37f71d);
  _0x2ec641[a0_0x5844(0x2cd)](-0x3, _0x3c53c4);
  const _0x4ca1ef = cbor[a0_0x5844(0x38d)](_0x2ec641);
  const _0x30be66 = crypto[a0_0x5844(0x38a)](0x10);
  const _0x577b94 = _0x30be66.toString(_0x55049a[a0_0x5844(0x2ff)]);
  const _0xcd30bd = Buffer.alloc(0x10, 0x0);
  const _0x1d8cbb = Buffer[a0_0x5844(0x25c)](0x2);
  _0x1d8cbb[a0_0x5844(0x31d)](_0x30be66[a0_0x5844(0x2b8)], 0x0);
  const _0x4990ba = Buffer.concat([_0xcd30bd, _0x1d8cbb, _0x30be66, _0x4ca1ef]);
  const _0x508c4b = crypto[a0_0x5844(0x2b7)](a0_0x5844(0x1fc))[a0_0x5844(0x314)](_0x55e551).digest();
  const _0x10abe5 = Buffer[a0_0x5844(0x25c)](0x4, 0x0);
  const _0x157eb2 = Buffer.concat([_0x508c4b, Buffer[a0_0x5844(0x32f)]([0x41]), _0x10abe5, _0x4990ba]);
  const _0x3168ca = new Map();
  _0x3168ca[a0_0x5844(0x2cd)](a0_0x5844(0x37b), _0x55049a[a0_0x5844(0x252)]);
  _0x3168ca[a0_0x5844(0x2cd)](a0_0x5844(0x286), new Map());
  _0x3168ca[a0_0x5844(0x2cd)](_0x55049a.MFGRF, _0x157eb2);
  const _0x11ef7d = cbor[a0_0x5844(0x38d)](_0x3168ca);
  const _0x2eeeaa = _0x11ef7d[a0_0x5844(0x380)](_0x55049a.deTtY);
  const _0xc77c04 = _0x577b94.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, '');
  return {
    "id": _0xc77c04,
    "type": "public-key",
    "rawId": Buffer[a0_0x5844(0x32f)](_0x30be66)[a0_0x5844(0x380)](_0x55049a[a0_0x5844(0x2ff)]),
    "response": {
      "clientDataJSON": _0x255b86,
      "attestationObject": _0x2eeeaa
    }
  };
}
async function registerAccount(_0x1b17f4, _0xc828d6, _0xc159a6, _0x11b53c, _0x5ce2dc, _0x490be2) {
  const _0x17f016 = {
    "CLTXu": function (_0x410eb6, _0x2496e3) {
      return _0x410eb6(_0x2496e3);
    },
    "pgCFI": "https://dashboard.allscale.io/api/public/businesses/webauthn/register",
    "fXLxE": function (_0x28f5a9) {
      return _0x28f5a9();
    },
    "aZikn": function (_0xf75a7c, _0x1a60d0, _0x29d364) {
      return _0xf75a7c(_0x1a60d0, _0x29d364);
    },
    "ozCcD": " Registration successful!"
  };
  const _0x11b49a = await getOptions(_0x1b17f4, _0xc828d6, _0x11b53c);
  if (!_0x11b49a) {
    return {
      "success": false
    };
  }
  const _0x473553 = await generateCredential(_0x11b49a.options);
  const _0x241c3e = {
    "credential_json": _0x473553,
    "email": _0xc828d6,
    "user_id": _0x11b49a.user_id,
    "referer_id": _0x11b53c,
    "device_id_str": _0x17f016[a0_0x5844(0x26a)](uuidv4),
    "device_type": 0x1,
    "ip_address": _0x490be2,
    "user_agent": _0x5ce2dc
  };
  const _0x9af7aa = _0x17f016[a0_0x5844(0x393)](createSpinner, a0_0x5844(0x217));
  _0x9af7aa.start();
  try {
    const _0x122b07 = await _0x1b17f4[a0_0x5844(0x30e)]("https://dashboard.allscale.io/api/public/businesses/webauthn/register", _0x241c3e, {
      "headers": _0x17f016[a0_0x5844(0x2dd)](getGlobalHeaders, "https://dashboard.allscale.io/api/public/businesses/webauthn/register", _0x11b53c)
    });
    if (_0x122b07[a0_0x5844(0x24d)].code === 0x0) {
      _0x9af7aa[a0_0x5844(0x32e)](_0x17f016[a0_0x5844(0x24f)]);
      return {
        "success": true,
        "data": _0x122b07[a0_0x5844(0x24d)][a0_0x5844(0x24d)]
      };
    } else {
      throw new Error("Server error: " + JSON[a0_0x5844(0x36e)](_0x122b07[a0_0x5844(0x24d)]));
    }
  } catch (_0x290095) {
    const _0x1f1b85 = _0x290095[a0_0x5844(0x25a)] ? JSON[a0_0x5844(0x36e)](_0x290095[a0_0x5844(0x25a)][a0_0x5844(0x24d)]) : _0x290095[a0_0x5844(0x379)];
    _0x9af7aa[a0_0x5844(0x301)](" Failed to register: " + _0x1f1b85);
    return {
      "success": false
    };
  }
}
async function doRegister(_0x21482d, _0x289f9f, _0x574f27) {
  const _0x1b77bf = {
    "qFogB": "PHPSESSID",
    "XEeOQ": function (_0x4d4927, _0x2dd40f) {
      return _0x4d4927 * _0x2dd40f;
    },
    "psiGR": function (_0x4a8480, _0x3ea816, _0x4fdd46, _0xf45b03, _0x1e9636) {
      return _0x4a8480(_0x3ea816, _0x4fdd46, _0xf45b03, _0x1e9636);
    },
    "MqCVU": function (_0x12cad1, _0x224160, _0x2633aa, _0x3a7663, _0x4ea4ba, _0x111e31, _0x1bd096) {
      return _0x12cad1(_0x224160, _0x2633aa, _0x3a7663, _0x4ea4ba, _0x111e31, _0x1bd096);
    },
    "Wwyjf": function (_0x5069b7, _0x117372, _0x3e4ef, _0x59600f) {
      return _0x5069b7(_0x117372, _0x3e4ef, _0x59600f);
    },
    "aXIYb": function (_0x129219, _0x581c39, _0x204624, _0x5eb3fe) {
      return _0x129219(_0x581c39, _0x204624, _0x5eb3fe);
    },
    "smaGr": function (_0xf3e9b2, _0xc85bc7) {
      return _0xf3e9b2 === _0xc85bc7;
    },
    "GJPIF": a0_0x5844(0x344),
    "YruvJ": a0_0x5844(0x31f),
    "aRVLz": function (_0x368bbd, _0x5d5430, _0x427c6a, _0x2097d7, _0x2ab14d) {
      return _0x368bbd(_0x5d5430, _0x427c6a, _0x2097d7, _0x2ab14d);
    },
    "WvkUT": function (_0x41766b, _0x5897f2, _0x5a55d7, _0x4419e9, _0x221893) {
      return _0x41766b(_0x5897f2, _0x5a55d7, _0x4419e9, _0x221893);
    }
  };
  const _0xfe8ad4 = new UserAgent()[a0_0x5844(0x380)]();
  const _0x506329 = await getIpAddress(_0x21482d);
  const _0x3d03b4 = providers[Math[a0_0x5844(0x295)](_0x1b77bf[a0_0x5844(0x30f)](Math[a0_0x5844(0x2d5)](), providers[a0_0x5844(0x2b8)]))];
  const _0x1792c6 = await _0x1b77bf[a0_0x5844(0x28b)](getTempEmail, _0x3d03b4, _0x21482d, _0x506329, _0xfe8ad4);
  if (!_0x1792c6) {
    return {
      "success": false
    };
  }
  const _0x1d59d3 = _0x1792c6[a0_0x5844(0x221)];
  console[a0_0x5844(0x28f)]('' + GREEN + "[1m" + a0_0x5844(0x361) + _0x1d59d3 + RESET);
  const {
    success: _0x50d074,
    data: _0x4de39b
  } = await registerAccount(_0x21482d, _0x1d59d3, null, _0x289f9f, _0xfe8ad4, _0x506329);
  if (!_0x50d074) {
    return {
      "success": false
    };
  }
  const _0x2bf7e6 = await sendVerification(_0x21482d, _0x1d59d3, _0x4de39b.token);
  if (!_0x2bf7e6) {
    return {
      "success": false
    };
  }
  const _0x57630a = await _0x1b77bf[a0_0x5844(0x212)](checkInbox, _0x3d03b4, _0x21482d, _0x1792c6);
  if (!_0x57630a) {
    if (_0x1b77bf[a0_0x5844(0x275)](_0x1b77bf[a0_0x5844(0x341)], a0_0x5844(0x25f))) {
      if (_0x22251b.includes(_0x1b77bf[a0_0x5844(0x29f)])) {
        _0xc10b64 = _0x2604b4[a0_0x5844(0x35e)](";")[0x0].split("=")[0x1];
      }
    } else {
      const {
        verifCode: _0x588562
      } = await inquirer.prompt([{
        "type": a0_0x5844(0x37d),
        "name": _0x1b77bf.YruvJ,
        "message": "[36m" + a0_0x5844(0x276) + RESET
      }]);
      if (_0x588562) {
        const _0x2467ff = await _0x1b77bf[a0_0x5844(0x27b)](verifyEmail, _0x21482d, _0x1d59d3, _0x588562, _0x4de39b[a0_0x5844(0x2d2)]);
        if (_0x2467ff) {
          return {
            "success": true,
            "email": _0x1d59d3,
            "token": _0x4de39b.token,
            "refresh_token": _0x4de39b[a0_0x5844(0x27f)]
          };
        }
      }
      return {
        "success": false
      };
    }
  }
  const _0x47a846 = await verifyEmail(_0x21482d, _0x1d59d3, _0x57630a, _0x4de39b.token);
  if (!_0x47a846) {
    return {
      "success": false
    };
  }
  return {
    "success": true,
    "email": _0x1d59d3,
    "token": _0x4de39b[a0_0x5844(0x2d2)],
    "refresh_token": _0x4de39b[a0_0x5844(0x2d2)]
  };
}
async function main() {
  const _0x33c506 = {
    "pmEfE": function (_0x2247d1, _0x2d482a, _0x4d2c08) {
      return _0x2247d1(_0x2d482a, _0x4d2c08);
    },
    "slONx": function (_0x3129a7, _0x45bc8a) {
      return _0x3129a7(_0x45bc8a);
    },
    "qsMtn": a0_0x5844(0x2a4),
    "MFaLP": a0_0x5844(0x316),
    "TiILi": a0_0x5844(0x2db),
    "NaJke": "Rotating",
    "gyjtY": a0_0x5844(0x239),
    "ScqRh": function (_0x3198b1, _0x1e55ee) {
      return _0x3198b1 > _0x1e55ee;
    },
    "gJjUM": "fgKkt",
    "Ulpzd": a0_0x5844(0x37d),
    "eShuL": a0_0x5844(0x1fb),
    "kPAxx": a0_0x5844(0x31a),
    "DcWqH": a0_0x5844(0x2bb),
    "EaSrD": a0_0x5844(0x27e),
    "wHkYc": a0_0x5844(0x1f4),
    "NCYWk": function (_0x17f1fe, _0x2713fd) {
      return _0x17f1fe < _0x2713fd;
    },
    "IwQIP": function (_0x567ab2, _0x809a8f) {
      return _0x567ab2 === _0x809a8f;
    },
    "vzHEh": function (_0x6714db, _0x3cedaa) {
      return _0x6714db + _0x3cedaa;
    },
    "ktiQH": function (_0x3f9295, _0x4e62f0) {
      return _0x3f9295 > _0x4e62f0;
    },
    "XpTRX": function (_0x5ce178, _0x2355fa) {
      return _0x5ce178 * _0x2355fa;
    },
    "ZkJUc": function (_0x4dac9d, _0x118342) {
      return _0x4dac9d !== _0x118342;
    },
    "bDuOC": a0_0x5844(0x282),
    "PdbVW": function (_0x3806fb, _0x4ebcc6) {
      return _0x3806fb === _0x4ebcc6;
    },
    "pPeCG": a0_0x5844(0x20b),
    "ZGBxN": a0_0x5844(0x1fd),
    "wppsy": "https://api.ipify.org?format=json",
    "FgIgR": function (_0xeee725, _0x2fa6b4, _0x31f328, _0x35eb03) {
      return _0xeee725(_0x2fa6b4, _0x31f328, _0x35eb03);
    },
    "lQvnb": a0_0x5844(0x359),
    "PKnYV": function (_0x3b062d, _0x4f032d) {
      return _0x3b062d + _0x4f032d;
    },
    "dZftm": function (_0x153159, _0x4c2e7a) {
      return _0x153159 - _0x4c2e7a;
    },
    "vcXZO": function (_0x3ba181, _0x2942c7) {
      return _0x3ba181(_0x2942c7);
    }
  };
  const {
    useProxy: _0x3eb7f9
  } = await inquirer[a0_0x5844(0x2ed)]([{
    "type": a0_0x5844(0x335),
    "name": "useProxy",
    "message": "[36m" + a0_0x5844(0x35a) + RESET,
    "default": false
  }]);
  let _0x241538 = [];
  let _0x175fd4 = null;
  let _0x4d61e2 = axios[a0_0x5844(0x285)]();
  if (_0x3eb7f9) {
    const _0x1b9286 = await inquirer.prompt([{
      "type": _0x33c506[a0_0x5844(0x247)],
      "name": a0_0x5844(0x2a2),
      "message": "[36m" + a0_0x5844(0x2a8) + RESET,
      "choices": ["Rotating", _0x33c506[a0_0x5844(0x346)]]
    }]);
    _0x175fd4 = _0x1b9286[a0_0x5844(0x2a2)];
    _0x241538 = readProxiesFromFile(a0_0x5844(0x2e7));
    if (_0x33c506[a0_0x5844(0x38e)](_0x241538[a0_0x5844(0x2b8)], 0x0)) {
      console[a0_0x5844(0x28f)](BLUE + a0_0x5844(0x357) + _0x241538.length + a0_0x5844(0x2a7) + RESET + "\n");
    } else {
      console[a0_0x5844(0x28f)]("[33m" + a0_0x5844(0x378) + RESET + "\n");
    }
  }
  let _0x278e35;
  while (true) {
    if ("fgKkt" !== _0x33c506[a0_0x5844(0x265)]) {
      _0x29c0b3[a0_0x5844(0x28f)](_0x4c9f00 + a0_0x5844(0x2d3) + _0x1f26b5.message + _0x13284c);
      return null;
    } else {
      const _0x4955b2 = await inquirer.prompt([{
        "type": _0x33c506[a0_0x5844(0x392)],
        "name": _0x33c506.eShuL,
        "message": "[36m" + a0_0x5844(0x368) + RESET,
        "validate": _0x376c16 => {
          const _0x49eb8b = _0x33c506[a0_0x5844(0x202)](parseInt, _0x376c16, 0xa);
          return _0x33c506[a0_0x5844(0x297)](isNaN, _0x49eb8b) || _0x49eb8b <= 0x0 ? RED + a0_0x5844(0x2df) + RESET : true;
        }
      }]);
      _0x278e35 = parseInt(_0x4955b2[a0_0x5844(0x1fb)], 0xa);
      if (_0x278e35 > 0x0) {
        break;
      }
    }
  }
  const {
    referralCode: _0x214cb6
  } = await inquirer[a0_0x5844(0x2ed)]([{
    "type": _0x33c506.Ulpzd,
    "name": _0x33c506[a0_0x5844(0x215)],
    "message": "[36m" + a0_0x5844(0x24a) + RESET
  }]);
  console[a0_0x5844(0x28f)]("[33m" + a0_0x5844(0x310) + RESET);
  console.log("[33m[1m" + a0_0x5844(0x241) + _0x278e35 + a0_0x5844(0x34f) + RESET);
  console[a0_0x5844(0x28f)]("[33m" + a0_0x5844(0x25b) + RESET);
  console.log("[33m" + a0_0x5844(0x356) + RESET + "\n");
  const _0x486516 = _0x33c506[a0_0x5844(0x35c)];
  let _0x3db9c7 = [];
  if (fs[a0_0x5844(0x245)](_0x486516)) {
    try {
      _0x3db9c7 = JSON[a0_0x5844(0x26f)](fs[a0_0x5844(0x33d)](_0x486516, a0_0x5844(0x316)));
    } catch (_0x46ed96) {
      if (_0x33c506[a0_0x5844(0x32c)] !== _0x33c506[a0_0x5844(0x2b1)]) {
        _0x3db9c7 = [];
      } else {
        _0x55aaa3[a0_0x5844(0x32e)](a0_0x5844(0x2f4));
        return true;
      }
    }
  }
  let _0x33476f = 0x0;
  let _0x59ce2a = 0x0;
  for (let _0x24532c = 0x0; _0x33c506[a0_0x5844(0x2fc)](_0x24532c, _0x278e35); _0x24532c++) {
    console[a0_0x5844(0x28f)]("[36m[1m\n================================ ACCOUNT " + _0x33c506[a0_0x5844(0x32b)](_0x24532c, 0x1) + "/" + _0x278e35 + a0_0x5844(0x322) + RESET);
    let _0x24d32a = null;
    if (_0x3eb7f9 && _0x241538[a0_0x5844(0x2b8)] > 0x0) {
      if (_0x33c506[a0_0x5844(0x231)](_0x175fd4, _0x33c506[a0_0x5844(0x397)])) {
        _0x24d32a = _0x241538[Math[a0_0x5844(0x295)](_0x33c506[a0_0x5844(0x389)](Math[a0_0x5844(0x2d5)](), _0x241538.length))];
      } else {
        _0x24d32a = _0x241538.shift();
      }
      if (!_0x24d32a) {
        if (_0x33c506[a0_0x5844(0x236)](_0x33c506[a0_0x5844(0x2cf)], _0x33c506[a0_0x5844(0x2cf)])) {
          _0x47d70b = _0x33c506[a0_0x5844(0x2b4)];
          _0x2acb97[a0_0x5844(0x28f)](_0x1e5f27 + a0_0x5844(0x210) + _0x55b690[a0_0x5844(0x379)] + _0x4662f6);
        } else {
          console[a0_0x5844(0x28f)](RED + a0_0x5844(0x29c) + RESET);
          process[a0_0x5844(0x35b)](0x1);
        }
      }
      console[a0_0x5844(0x28f)](WHITE + a0_0x5844(0x35f) + _0x24d32a + RESET);
      const _0x1b8096 = new HttpsProxyAgent(_0x24d32a);
      _0x4d61e2 = axios[a0_0x5844(0x285)]({
        "httpAgent": _0x1b8096,
        "httpsAgent": _0x1b8096
      });
    } else {
      if (_0x33c506[a0_0x5844(0x23b)](_0x33c506[a0_0x5844(0x24e)], _0x33c506[a0_0x5844(0x255)])) {
        _0x975a42.log(_0x1863ee + a0_0x5844(0x33b) + _0x583b17 + _0x20f53a);
        return {
          "provider": a0_0x5844(0x26b),
          "address": _0x65cc9f,
          "password": _0x1979b2,
          "login": _0x3e13f3,
          "domain": _0x18eac5
        };
      } else {
        _0x4d61e2 = axios[a0_0x5844(0x285)]();
      }
    }
    let _0x22ceec = '';
    try {
      const _0x34ccb0 = await _0x4d61e2.get(_0x33c506[a0_0x5844(0x274)]);
      _0x22ceec = _0x34ccb0[a0_0x5844(0x24d)].ip;
    } catch (_0x4dcd9e) {
      _0x22ceec = _0x33c506.qsMtn;
      console[a0_0x5844(0x28f)](RED + a0_0x5844(0x210) + _0x4dcd9e[a0_0x5844(0x379)] + RESET);
    }
    console[a0_0x5844(0x28f)](WHITE + a0_0x5844(0x2d4) + _0x22ceec + RESET + "\n");
    const {
      success: _0x2ddfc4,
      email: _0x5e59a0,
      token: _0xaff744,
      refresh_token: _0x5a94b7
    } = await _0x33c506[a0_0x5844(0x29e)](doRegister, _0x4d61e2, _0x214cb6, a0_0x5844(0x287) + (_0x24532c + 0x1));
    if (!_0x2ddfc4) {
      _0x59ce2a++;
      console[a0_0x5844(0x28f)]("[33m" + a0_0x5844(0x31e) + _0x33c506[a0_0x5844(0x32b)](_0x24532c, 0x1) + "/" + _0x278e35 + a0_0x5844(0x242) + _0x33476f + a0_0x5844(0x201) + _0x59ce2a + ")" + RESET);
      console[a0_0x5844(0x28f)]("[36m[1m" + a0_0x5844(0x21c) + RESET + "\n");
      continue;
    }
    _0x3db9c7.push({
      "email": _0x5e59a0,
      "token": _0xaff744,
      "refresh_token": _0x5a94b7,
      "registeredAt": new Date()[a0_0x5844(0x338)]()
    });
    try {
      if (_0x33c506[a0_0x5844(0x24c)] !== a0_0x5844(0x359)) {
        return _0x176de0[0x1];
      } else {
        fs.writeFileSync(_0x486516, JSON[a0_0x5844(0x36e)](_0x3db9c7, null, 0x2));
        console.log('' + GREEN + "[1m" + a0_0x5844(0x345) + _0x486516 + RESET);
      }
    } catch (_0x552550) {
      console.log(RED + a0_0x5844(0x1f6) + _0x486516 + ": " + _0x552550[a0_0x5844(0x379)] + RESET);
    }
    _0x33476f++;
    console.log("[33m\nProgress: " + _0x33c506[a0_0x5844(0x2ad)](_0x24532c, 0x1) + "/" + _0x278e35 + " akun telah diproses. (Berhasil: " + _0x33476f + a0_0x5844(0x201) + _0x59ce2a + ")" + RESET);
    console[a0_0x5844(0x28f)]("[36m[1m" + a0_0x5844(0x21c) + RESET + "\n");
    if (_0x24532c < _0x33c506[a0_0x5844(0x353)](_0x278e35, 0x1)) {
      const _0x316f5c = Math[a0_0x5844(0x295)](Math[a0_0x5844(0x2d5)]() * _0x33c506[a0_0x5844(0x32b)](_0x33c506[a0_0x5844(0x353)](0x9c40, 0x61a8), 0x1)) + 0x61a8;
      await _0x33c506[a0_0x5844(0x2c0)](countdown, _0x316f5c);
    }
  }
  console[a0_0x5844(0x28f)]('' + BLUE + "[1m" + "\nProses selesai." + RESET);
}
main()[a0_0x5844(0x384)](_0x120189 => console[a0_0x5844(0x28f)](RED + a0_0x5844(0x398) + _0x120189.message + RESET));
