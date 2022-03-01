import { useQuery } from '@apollo/client';
import { NonIdealState, Button } from '@blueprintjs/core';
import Grid from '@components/Formations/components/Grid';
import { useSelection } from '@context/selection-context';
import { useWorkspace } from '@context/workspace-context';
import nookies from 'nookies';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import GrovesCanvas from '~/src/components/Canvas';
import CanvasContextMenu from '~/src/components/CanvasContextMenu';
import ChannelIndex from '~/src/components/Formations/components/ChannelIndex';
import KeyMapDialog from '~/src/components/KeyMapDialog';
import Loading from '~/src/components/Loader';
import SelectionPanel from '~/src/components/SelectionPanel';
import Formations from '~/src/constants/Formations';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import client from '~/src/lib/apollo-client';
import { addApolloState, initializeApollo } from '~/src/lib/apolloClient';

const Grove = ({ data, initialSelection, ...props }) => {
  const { workspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const { apollo } = props;

  const { selectedConnection, channelID } = useSelection();

  const { loading, data: channelSkeleton } = useQuery(CHANNEL_SKELETON, {
    variables: { id: channelID },
    fetchPolicy: 'no-cache',
    client: apollo,
  });

  const renderFormation = (formation) => {
    if (loading) {
      return <Loading fullScreen={true} description="Loading blocks..." />;
    }

    console.log(channelSkeleton?.channel?.initial_contents);

    if (!channelSkeleton?.channel?.initial_contents.length) {
      return (
        <NonIdealState
          className="w-screen h-screen"
          icon={
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1312 788"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.927734"
                y="0.659912"
                width="1310.66"
                height="786.93"
                rx="130"
                fill="#47A7FF"
              />
              <g clip-path="url(#clip0_827_19)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M496.106 396.14C479.987 396.14 469.652 408.567 469.652 427.884C469.652 447.078 479.987 459.628 496.106 459.628C503.979 459.628 510.255 456.06 514.683 449.17H514.93V455.937C514.93 469.84 509.393 475.623 498.32 475.623C489.215 475.623 483.556 471.44 483.186 464.18H472.359C472.727 476.484 482.202 483.99 498.197 483.99C515.669 483.99 525.512 474.762 525.512 456.429V397.74H515.053V406.845H514.807C510.5 399.708 504.103 396.14 496.106 396.14ZM497.827 405.122C508.655 405.122 515.299 413.858 515.299 427.884C515.299 441.788 508.655 450.523 497.827 450.523C487.615 450.523 480.971 441.541 480.971 427.884C480.971 414.104 487.615 405.122 497.827 405.122Z"
                  fill="white"
                />
                <path
                  d="M573.772 397.124C565.775 397.124 559.499 400.446 555.316 407.337H555.07V397.74H544.735V460.243H555.563V428.376C555.563 414.596 562.206 406.967 574.018 406.967C574.96 406.967 576.023 407.087 577.038 407.201C577.481 407.251 577.914 407.299 578.325 407.337V397.617C576.971 397.248 575.126 397.124 573.772 397.124Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M612.129 396.017C593.796 396.017 582.477 408.567 582.477 428.992C582.477 449.416 593.796 461.966 612.129 461.966C630.462 461.966 641.904 449.416 641.904 428.992C641.904 408.567 630.462 396.017 612.129 396.017ZM612.129 404.876C623.572 404.876 630.585 414.104 630.585 428.992C630.585 443.879 623.572 453.107 612.129 453.107C600.81 453.107 593.796 443.879 593.796 428.992C593.796 414.104 600.81 404.876 612.129 404.876Z"
                  fill="white"
                />
                <path
                  d="M705.208 397.74H693.642L684.661 423.947C681.462 433.421 678.632 442.28 675.678 451.754H675.433C672.479 442.28 669.526 433.421 666.327 423.947L657.469 397.74H645.903L668.542 460.243H682.568L705.208 397.74Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M738.526 453.599C728.314 453.599 720.439 446.586 719.947 431.206H766.701C766.701 425.792 766.333 421.363 765.472 417.795C762.272 404.384 752.306 396.017 738.157 396.017C719.947 396.017 709.12 409.674 709.12 428.13C709.12 448.555 720.07 461.966 738.526 461.966C754.521 461.966 763.995 452.492 766.087 441.541H755.013C753.537 448.555 747.63 453.599 738.526 453.599ZM738.157 404.384C747.754 404.384 754.89 410.782 755.997 422.963H720.07C721.178 411.028 728.191 404.384 738.157 404.384Z"
                  fill="white"
                />
                <path
                  d="M801.849 396.017C788.192 396.017 778.718 403.399 778.718 414.104C778.718 427.25 788.635 429.68 798.704 432.148L799.881 432.437C811.939 435.389 817.106 436.743 817.106 444.002C817.106 449.662 811.692 453.353 803.572 453.353C793.852 453.353 788.192 448.431 788.192 439.45H777.241C777.365 454.091 787.084 461.966 803.449 461.966C818.583 461.966 828.18 454.46 828.18 443.264C828.18 429.15 816.668 426.315 805.515 423.568L804.556 423.332C794.097 420.871 789.546 419.763 789.546 413.242C789.546 407.829 794.221 404.384 801.726 404.384C810.462 404.384 815.63 408.936 815.63 417.303H826.211C826.211 403.523 817.106 396.017 801.849 396.017Z"
                  fill="white"
                />
                <path
                  d="M1066.23 123.697C1069.86 123.697 1072.81 126.645 1072.81 130.282V165.397C1072.81 169.033 1069.86 171.981 1066.23 171.981C1062.59 171.981 1059.64 169.033 1059.64 165.397V130.282C1059.64 126.645 1062.59 123.697 1066.23 123.697Z"
                  fill="white"
                />
                <path
                  d="M982.563 156.352C985.133 153.781 989.303 153.781 991.874 156.352L1016.7 181.182C1019.28 183.753 1019.28 187.922 1016.7 190.494C1014.13 193.065 1009.96 193.065 1007.39 190.494L982.563 165.663C979.992 163.092 979.992 158.923 982.563 156.352Z"
                  fill="white"
                />
                <path
                  d="M1149.89 156.352C1152.46 158.923 1152.46 163.092 1149.89 165.663L1125.06 190.494C1122.49 193.065 1118.32 193.065 1115.75 190.494C1113.18 187.922 1113.18 183.753 1115.75 181.182L1140.58 156.352C1143.15 153.781 1147.32 153.781 1149.89 156.352Z"
                  fill="white"
                />
                <path
                  d="M1184.74 242.212C1184.74 245.849 1181.79 248.796 1178.16 248.796H1143.04C1139.41 248.796 1136.46 245.849 1136.46 242.212C1136.46 238.576 1139.41 235.628 1143.04 235.628H1178.16C1181.79 235.628 1184.74 238.576 1184.74 242.212Z"
                  fill="white"
                />
                <path
                  d="M995.997 242.212C995.997 245.849 993.05 248.796 989.413 248.796H954.297C950.661 248.796 947.713 245.849 947.713 242.212C947.713 238.576 950.661 235.628 954.297 235.628H989.413C993.05 235.628 995.997 238.576 995.997 242.212Z"
                  fill="white"
                />
                <path
                  d="M1066.23 312.443C1069.86 312.443 1072.81 315.391 1072.81 319.027V354.143C1072.81 357.779 1069.86 360.727 1066.23 360.727C1062.59 360.727 1059.64 357.779 1059.64 354.143V319.027C1059.64 315.391 1062.59 312.443 1066.23 312.443Z"
                  fill="white"
                />
                <path
                  d="M1116.44 296.814C1119.01 294.243 1123.18 294.243 1125.75 296.814L1150.58 321.644C1153.15 324.215 1153.15 328.384 1150.58 330.956C1148.01 333.527 1143.84 333.527 1141.27 330.956L1116.44 306.125C1113.87 303.554 1113.87 299.385 1116.44 296.814Z"
                  fill="white"
                />
                <path
                  d="M1016.02 296.814C1018.59 299.385 1018.59 303.554 1016.02 306.125L991.185 330.956C988.614 333.527 984.445 333.527 981.874 330.956C979.302 328.384 979.302 324.215 981.874 321.644L1006.7 296.814C1009.28 294.243 1013.44 294.243 1016.02 296.814Z"
                  fill="white"
                />
                <path
                  d="M1107.93 242.212C1107.93 265.242 1089.26 283.912 1066.23 283.912C1043.2 283.912 1024.53 265.242 1024.53 242.212C1024.53 219.182 1043.2 200.513 1066.23 200.513C1089.26 200.513 1107.93 219.182 1107.93 242.212Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M176.111 0.659185C146.391 0.658964 122.979 0.658964 104.138 2.19844C84.9155 3.76885 68.8634 7.03135 54.2761 14.4639C30.444 26.607 11.0682 45.9831 -1.07534 69.8152C-8.50725 84.4025 -11.77 100.455 -13.3408 119.677C-14.8798 138.518 -14.8798 161.93 -14.8798 191.651V605.798C-14.8798 635.518 -14.8798 658.93 -13.3408 677.771C-12.8673 683.564 -12.2409 689.069 -11.3918 694.332C-25.6089 696.589 -39.4992 697.906 -53.2392 698.181C-59.7726 698.312 -65.7282 701.956 -68.8195 707.714C-71.91 713.472 -71.6555 720.45 -68.1534 725.967L29.5535 879.908C32.8286 885.069 38.4882 888.227 44.6002 888.304L1113.04 901.876C1117.26 901.929 1121.36 900.507 1124.65 897.855L1388.82 684.348C1394.78 679.528 1397.06 671.473 1394.5 664.243C1391.94 657.014 1385.11 652.181 1377.44 652.181C1354.08 652.181 1332.01 651.797 1311.11 651.074C1311.4 637.841 1311.4 622.858 1311.4 605.796V191.653C1311.4 161.933 1311.4 138.518 1309.86 119.677C1308.29 100.455 1305.03 84.4025 1297.6 69.8152C1285.45 45.9831 1266.08 26.607 1242.24 14.4639C1227.66 7.03135 1211.6 3.76885 1192.38 2.19844C1173.54 0.658964 1150.13 0.658964 1120.41 0.659185H176.111ZM1230.03 658.082C1261.82 660.878 1275.21 629.272 1275.21 604.994V192.454C1275.21 161.755 1275.2 139.819 1273.79 122.624C1272.41 105.639 1269.75 94.8796 1265.35 86.2441C1256.68 69.221 1242.84 55.3812 1225.82 46.7075C1217.18 42.3073 1206.42 39.6535 1189.44 38.266C1172.24 36.861 1150.3 36.8469 1119.6 36.8469H176.915C146.216 36.8469 124.279 36.861 107.084 38.266C90.0999 39.6535 79.3407 42.3073 70.7046 46.7075C53.6824 55.3812 39.8417 69.221 31.1685 86.2441C26.7687 94.8796 24.1147 105.639 22.7267 122.624C21.322 139.819 21.3079 161.755 21.3079 192.454V604.994C21.3079 611.504 28.2477 615.558 28.359 622.182C38.7852 701.242 50.7539 730.498 84.7438 720.186C107.085 711.205 137.474 675.361 151.32 664.224C178.309 639.349 183.096 637.051 194.041 629.74C206.512 621.411 227.625 606.222 241.272 600.674C254.944 595.117 263.907 581.84 263.907 567.081V416.889C263.907 406.896 255.806 398.795 245.813 398.795H212.209C151.745 398.795 102.73 349.98 102.73 289.763C102.73 234.253 144.382 188.432 198.257 181.607C208.088 136.097 248.723 101.985 297.359 101.985C353.343 101.985 398.728 147.184 398.728 202.941C398.728 208.942 398.203 214.821 397.194 220.534C422.635 238.235 439.276 267.616 439.276 300.868C439.276 354.952 395.253 398.795 340.948 398.795H312.412C302.419 398.795 294.318 406.896 294.318 416.889V559.709C294.318 572.282 306.841 581.019 318.75 576.991C452.039 531.908 564.972 525.283 742.121 540.83C830.233 548.563 893.118 568.295 957.954 588.638L957.962 588.641C974.732 593.903 991.633 599.206 1009.14 604.352C1067.89 621.631 1134.7 649.696 1230.03 658.082ZM223.637 169.247C220.941 175.087 225.396 181.322 231.748 182.462C255.565 186.735 276.704 198.68 292.495 215.636C306.796 207.555 323.33 202.941 340.948 202.941C351.538 202.941 361.737 204.608 371.294 207.693C374.735 208.804 378.455 206.544 378.455 202.941C378.455 158.335 342.147 122.176 297.359 122.176C264.647 122.176 236.459 141.465 223.637 169.247ZM365.054 226.91C370.051 228.524 372.387 234.093 370.053 238.78C362.102 254.745 349.005 267.717 332.922 275.545C327.122 278.369 320.757 274.079 319.462 267.78C317.555 258.505 314.466 249.66 310.358 241.406C307.728 236.121 309.482 229.461 315.07 227.506C323.168 224.673 331.877 223.132 340.948 223.132C349.361 223.132 357.462 224.457 365.054 226.91ZM328.016 299.197C323.917 300.491 320.852 303.972 320.13 308.194C317.225 325.191 310.369 340.847 300.537 354.194C297.035 358.947 297.615 365.803 302.776 368.69C314.062 375.003 327.083 378.604 340.948 378.604C384.056 378.604 419.002 343.8 419.002 300.868C419.002 280.946 411.477 262.774 399.104 249.018C395.44 244.945 388.996 246.505 386.362 251.302C373.946 273.918 353.092 291.283 328.016 299.197ZM300.86 279.801C301.093 281.89 299.47 283.705 297.359 283.705C287.722 283.705 278.478 282.031 269.904 278.96C267.927 278.251 266.912 276.092 267.634 274.128C271.418 263.841 277.323 254.572 284.821 246.847C286.591 245.023 289.581 245.445 290.79 247.678C296.069 257.434 299.569 268.285 300.86 279.801ZM265.737 298.888C264.35 298.434 262.894 299.415 262.894 300.868C262.894 316.152 267.322 330.406 274.972 342.426C277.017 345.64 281.555 345.781 283.834 342.728C291.648 332.264 297.206 320.029 299.787 306.738C300.077 305.245 298.886 303.897 297.359 303.897C286.317 303.897 275.687 302.138 265.737 298.888ZM242.804 294.83C243.043 290.912 241.246 287.124 238.056 284.82C216.287 269.103 201.014 244.678 197.024 216.883C195.949 209.391 189.055 203.608 181.909 206.178C147.558 218.532 123.004 251.291 123.004 289.763C123.004 338.828 162.943 378.604 212.209 378.604C227.755 378.604 242.373 374.643 255.098 367.68C260.19 364.895 261.04 358.237 257.922 353.356C248.233 338.186 242.62 320.179 242.62 300.868C242.62 299.878 242.635 298.892 242.664 297.909C242.694 296.879 242.741 295.852 242.804 294.83ZM238.303 258.293C242.979 263.238 250.882 260.931 254.086 254.934C257.959 247.685 262.72 240.977 268.225 234.957C272.136 230.68 272.44 223.977 267.906 220.362C254.106 209.363 236.954 202.362 218.22 201.12C217.16 201.05 216.264 201.883 216.264 202.941C216.264 224.363 224.638 243.836 238.303 258.293Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M176.112 0.65974L1120.41 0.659185C1150.13 0.658964 1173.54 0.658964 1192.38 2.19844C1211.6 3.76885 1227.66 7.03135 1242.24 14.4639C1266.08 26.607 1285.45 45.9831 1297.6 69.8152C1305.03 84.4025 1308.29 100.455 1309.86 119.677C1311.4 138.518 1311.4 161.933 1311.4 191.653V605.796C1311.4 635.517 1311.4 658.93 1309.86 677.772C1308.29 696.994 1305.03 713.046 1297.6 727.634C1285.45 751.466 1266.08 770.842 1242.24 782.985C1227.66 790.417 1211.6 793.68 1192.38 795.25C1173.54 796.79 1150.13 796.79 1120.41 796.79H176.111C146.391 796.79 122.979 796.79 104.138 795.25C84.9158 793.68 68.8637 790.417 54.2764 782.985C30.4444 770.842 11.0683 751.466 -1.07473 727.634C-8.50734 713.046 -11.7703 696.994 -13.3408 677.771C-14.8798 658.93 -14.8798 635.518 -14.8798 605.798V191.651C-14.8798 161.93 -14.8798 138.518 -13.3408 119.677C-11.77 100.455 -8.50725 84.4025 -1.07534 69.8152C11.0682 45.9831 30.444 26.607 54.2761 14.4639C68.8634 7.03135 84.9155 3.76885 104.138 2.19844C122.979 0.659044 146.392 0.659616 176.112 0.65974ZM107.084 38.266C90.0999 39.6537 79.3409 42.308 70.7053 46.708C53.6824 55.3816 39.8421 69.2212 31.1685 86.2441C26.7687 94.8796 24.1147 105.639 22.7267 122.624C21.322 139.819 21.3079 161.755 21.3079 192.454V604.994C21.3079 635.693 21.3223 657.63 22.7272 674.825C24.1149 691.81 26.7687 702.569 31.1688 711.205C39.8424 728.228 53.6824 742.068 70.7053 750.741C79.3409 755.141 90.1005 757.795 107.085 759.183C124.28 760.588 146.216 760.602 176.915 760.602H1119.61C1150.3 760.602 1172.24 760.588 1189.44 759.183C1206.42 757.795 1217.18 755.141 1225.82 750.741C1242.84 742.068 1256.68 728.228 1265.35 711.205C1269.75 702.569 1272.41 691.81 1273.79 674.825C1275.2 657.63 1275.21 635.693 1275.21 604.994V192.454C1275.21 161.755 1275.2 139.819 1273.79 122.624C1272.41 105.639 1269.75 94.8796 1265.35 86.2441C1256.68 69.221 1242.84 55.3812 1225.82 46.7075C1217.18 42.3073 1206.42 39.6535 1189.44 38.266C1172.24 36.8611 1150.3 36.8469 1119.6 36.8469H176.915C146.216 36.8469 124.279 36.861 107.084 38.266Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M191.917 0.659678H1120.6C1150.32 0.659553 1173.73 0.659457 1192.57 2.19886C1211.79 3.76936 1227.85 7.03185 1242.43 14.4645C1266.26 26.6075 1285.64 45.9835 1297.78 69.8156C1305.22 84.4029 1308.48 100.455 1310.05 119.677C1311.59 138.519 1311.59 161.932 1311.59 191.653V596.597C1311.59 626.318 1311.59 649.731 1310.05 668.573C1308.48 687.795 1305.22 703.847 1297.78 718.434C1285.64 742.266 1266.26 761.642 1242.43 773.785C1227.85 781.218 1211.79 784.481 1192.57 786.051C1173.73 787.59 1150.32 787.59 1120.6 787.59H191.917C162.197 787.59 138.784 787.59 119.943 786.051C100.721 784.481 84.6688 781.218 70.0815 773.785C46.2495 761.642 26.8734 742.266 14.7304 718.434C7.29777 703.847 4.03528 687.795 2.46478 668.573C0.925376 649.731 0.925471 626.319 0.925595 596.599V191.651C0.925471 161.931 0.925376 138.518 2.46478 119.677C4.03528 100.455 7.29777 84.4029 14.7304 69.8156C26.8734 45.9836 46.2495 26.6075 70.0815 14.4645C84.6688 7.03185 100.721 3.76936 119.943 2.19886C138.784 0.659457 162.197 0.659553 191.917 0.659678ZM122.89 38.2664C105.906 39.6541 95.146 42.3079 86.5104 46.708C69.4875 55.3816 55.6475 69.2216 46.9739 86.2445C42.5738 94.8801 39.92 105.64 38.5323 122.624C37.1274 139.819 37.1133 161.755 37.1133 192.454V595.795C37.1133 626.494 36.8062 645.864 38.2111 663.06C38.2111 682.456 42.5738 693.37 46.9739 702.005C56.5367 732.722 69.4875 732.868 86.5104 741.542C95.146 745.942 105.906 748.596 122.89 749.984C140.085 751.388 162.021 751.402 192.721 751.402H1119.79C1150.49 751.402 1172.43 751.388 1189.62 749.984C1206.61 748.596 1217.37 745.942 1226 741.542C1243.03 732.868 1256.87 719.028 1265.54 702.005C1269.94 693.37 1272.59 682.61 1273.98 665.626C1275.39 648.431 1275.4 626.495 1275.4 595.795V192.455C1275.4 161.756 1275.39 139.819 1273.98 122.624C1272.59 105.64 1269.94 94.8801 1265.54 86.2445C1256.87 69.2216 1243.03 55.3816 1226 46.708C1217.37 42.3079 1206.61 39.6541 1189.62 38.2664C1172.43 36.8615 1150.49 36.8474 1119.79 36.8474H192.72C162.021 36.8474 140.085 36.8615 122.89 38.2664Z"
                  fill="white"
                />
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M191.919 0.659914H1120.6C1150.32 0.65979 1173.73 0.659694 1192.57 2.19909C1211.8 3.7696 1227.85 7.03209 1242.43 14.4647C1266.27 26.6077 1285.64 45.9838 1297.79 69.8158C1305.22 84.4032 1308.48 100.455 1310.05 119.677C1311.59 138.519 1311.59 161.933 1311.59 191.654V596.597C1311.59 626.318 1311.59 649.731 1310.05 668.573C1308.48 687.795 1305.22 703.847 1297.79 718.434C1285.64 742.266 1266.27 761.643 1242.43 773.786C1227.85 781.218 1211.8 784.481 1192.57 786.051C1173.73 787.591 1150.32 787.59 1120.6 787.59H191.919C162.199 787.59 138.786 787.591 119.945 786.051C100.723 784.481 84.671 781.218 70.0836 773.786C46.2516 761.642 26.8756 742.266 14.7325 718.434C7.29991 703.847 4.03742 687.795 2.46691 668.573C0.927516 649.732 0.927612 626.319 0.927737 596.599V191.651C0.927612 161.931 0.927516 138.519 2.46691 119.677C4.03742 100.455 7.29991 84.4032 14.7325 69.8158C26.8756 45.9838 46.2516 26.6077 70.0836 14.4647C84.671 7.03209 100.723 3.7696 119.945 2.19909C138.786 0.659694 162.199 0.65979 191.919 0.659914ZM122.892 38.2666C105.908 39.6543 95.1481 42.3081 86.5125 46.7082C69.4896 55.3818 55.6496 69.2218 46.976 86.2447C42.5759 94.8803 39.9221 105.64 38.5344 122.624C37.1295 139.82 37.1155 161.756 37.1155 192.455V595.795C37.1155 626.495 37.1295 648.431 38.5344 665.626C39.9221 682.61 42.576 693.37 46.976 702.006C55.6496 719.028 69.4896 732.868 86.5125 741.542C95.1481 745.942 105.908 748.596 122.892 749.984C140.087 751.389 162.024 751.403 192.723 751.403H1119.8C1150.49 751.403 1172.43 751.389 1189.63 749.984C1206.61 748.596 1217.37 745.942 1226.01 741.542C1243.03 732.868 1256.87 719.028 1265.54 702.006C1269.94 693.37 1272.6 682.61 1273.98 665.626C1275.39 648.431 1275.4 626.495 1275.4 595.796V192.455C1275.4 161.756 1275.39 139.82 1273.98 122.624C1272.6 105.64 1269.94 94.8803 1265.54 86.2447C1256.87 69.2218 1243.03 55.3818 1226.01 46.7082C1217.37 42.3081 1206.61 39.6543 1189.63 38.2666C1172.43 36.8617 1150.49 36.8476 1119.8 36.8476H192.723C162.023 36.8476 140.087 36.8617 122.892 38.2666Z"
                fill="white"
              />
              <defs>
                <clipPath id="clip0_827_19">
                  <rect
                    x="19.0205"
                    y="18.7537"
                    width="1274.48"
                    height="750.743"
                    rx="108.563"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          }
          title="There are no blocks in this Grove"
          description="Create a new block to continue, or connect an existing one by visiting another Grovex."
          action={<Button intent="primary" text="New Grove" icon="cube-add" />}
        />
      );
    }

    switch (formation.key) {
      case Formations.CANVAS.key:
        return (
          <>
            {selectedConnection && <SelectionPanel />}
            <CanvasContextMenu>
              <GrovesCanvas {...props} />
            </CanvasContextMenu>
          </>
        );
      case Formations.GRID.key:
        if (channelSkeleton && channelSkeleton.channel) {
          return (
            <div className="workspace">
              <SelectionPanel key={formation.key} />
              <CanvasContextMenu>
                <Grid blocks={channelSkeleton.channel.initial_contents} />
              </CanvasContextMenu>
            </div>
          );
        }
      case Formations.CHANNEL_INDEX.key:
        <ChannelIndex />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
      />

      <KeyMapDialog />

      {renderFormation(formation)}
    </div>
  );
};

export async function getInitialProps(context) {
  // const cookies = nookies.get(context);
  // if (!cookies.access_token) {
  //   context.res.writeHead(301, { Location: '/' });
  //   context.res.end();
  // }
  // const apolloClient = initializeApollo(cookies.access_token);
  // const id = context.query.grove;
  // const res = await apolloClient.query({
  //   query: CHANNEL_SKELETON,
  //   variables: {
  //     id: id,
  //   },
  // });
  // return addApolloState(apolloClient, {
  //   props: { initialSelection: res.data },
  // });
}

export default withApollo(Grove);
