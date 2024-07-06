import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import useUser from "./useUser";
import { useMutation } from "@tanstack/react-query";
import { genrateCertificate } from "./api";
import { toast } from "react-toastify";
import { useState } from "react"; // Import QRCode from 'qrcode.react' for generating QR code as an image
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  qrImage: {
    width: "100px",
    height: "100px",
  },
});

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [data, setData] = useState(null);

  const location = useLocation();
  const course = location.state;

  console.log(course, "course");

  const { mutate } = useMutation({
    mutationFn: genrateCertificate,
    onSuccess: (data) => {
      console.log(data, "data");
      setData(data?.certificateData);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    },
  });

  const CertificateDocument = ({ data }) => {
    const dataUrl = document.getElementById(123).toDataURL();
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.title}>
            <Text>Certificate of Completion</Text>
          </View>
          <View style={styles.text}>
            <Text>This is to certify that</Text>
            <Text>{data?.userName}</Text>
            <Text>has successfully completed the course</Text>
            <Text>{data?.courseName}</Text>
            <Text>on</Text>
            <Text>{data?.completionDate}</Text>
            <Text>This certificate is issued by SMIT</Text>
          </View>
          <View style={styles.qrCode}>
            {/* Render QR code as an image */}
            <Image allowDangerousPaths src={dataUrl} style={styles.qrImage} />
          </View>
        </Page>
      </Document>
    );
  };

  function isCourseCompleted(startTime, duration) {
    console.log(startTime, duration);
    const startDate = new Date(startTime);
    let endDate = new Date(startDate);
    if (duration.includes("Year")) {
      const years = parseInt(duration.split(" ")[0], 10);
      endDate.setFullYear(startDate.getFullYear() + years);
    } else if (duration.includes("Month")) {
      const months = parseInt(duration.split(" ")[0], 10);
      endDate.setMonth(startDate.getMonth() + months);
    }
    const currentDate = new Date();
    return currentDate > endDate;
  }

  return (
    <>
      <Navbar />
      <div className="container pt-12 flex items-center justify-between">
        <p
          className="pb-4 text-lg cursor-pointer"
          style={{ fontWeight: "500" }}
        >
          {course?.courseId?.name}
        </p>
        {isCourseCompleted(course?.startTime, course?.courseId?.duration) && (
          <button
            onClick={() => mutate({ userId: user._id, courseId: id })}
            className="bg-blue-600 text-white py-2 px-3"
            style={{ borderRadius: "10px" }}
            role="button"
          >
            Generate Certificate
          </button>
        )}
      </div>

      <div className="mt-8 text-center">
        {data && (
          <>
            <div id="content-id" className="p-4 text-lg text-center border">
              <p>Course Completion</p>
              <p className="my-5">
                This is to certify that{" "}
                <span style={{ fontWeight: "500" }}>{data.userName}</span> has
                completed the course{" "}
                <span style={{ fontWeight: "500" }}>{data.courseName}</span> on{" "}
                <span style={{ fontWeight: "500" }}>{data.completionDate}</span>
                .
              </p>
              <p>This certificate is issued by SMIT</p>
              <div className="mt-7">
                {/* Render QR code for preview in UI */}

                <QRCode
                  id={123}
                  value={data.qrCode}
                  size={144}
                  bgColor="#FFF"
                  fgColor="#000"
                  includeMargin
                  level={"H"}
                />
              </div>
            </div>
            <PDFDownloadLink
              document={<CertificateDocument data={data} />}
              fileName="certificate.pdf"
              className="border p-3 mt-4 bg-blue-600 text-white"
            >
              {({ loading }) =>
                loading ? "Generating PDF..." : "Download Certificate"
              }
            </PDFDownloadLink>
          </>
        )}
      </div>
    </>
  );
};

export default CourseDetail;
