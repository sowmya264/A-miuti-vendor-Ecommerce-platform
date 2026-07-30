from rest_framework.views import APIView
from rest_framework.response import Response

from users.permissions import IsAdmin


class Dashboard(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        return Response({
            "message": "Welcome Admin"
        })